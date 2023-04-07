import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  userId = '775220ba-c2b4-4109-b9bd-b4fa7eca7843';
  accessKey = 'YjA1NmY4ZGEtMDdhNC00NjZiLWExMDMtZDhmNDg4YTE5OTUw';
  apiBaseUrl = 'https://api.sophtron-prod.com/api/';
  userInstitutionId = '16908c13-b4bd-4dde-bae0-158d1bbf8c7d';
  apiEndpoints = {
    GetInstitutionByName: 'Institution/GetInstitutionByName',
    GetUserInstitutionsByUser: 'UserInstitution/GetUserInstitutionsByUser',
    GetUserIntegrationKey: 'User/GetUserIntegrationKey',
    GetJobInformationByID: 'Job/GetJobInformationByID',
    GetUserInstitutionAccounts: 'UserInstitution/GetUserInstitutionAccounts',
  };

  buildAuthCode = (httpMethod, url) => {
    const authPath = url.substring(url.lastIndexOf('/')).toLowerCase();
    const integrationKey = Buffer.from(this.accessKey, 'base64');
    const plainKey = httpMethod.toUpperCase() + '\n' + authPath;
    const b64Sig = crypto
      .createHmac('sha256', integrationKey)
      .update(plainKey)
      .digest('base64');
    const authString =
      'FIApiAUTH:' + this.userId + ':' + b64Sig + ':' + authPath;
    return authString;
  };

  post = async (url, data) => {
    try {
      const conf = {
        headers: { Authorization: this.buildAuthCode('post', url) },
      };
      const { data: res } = await axios.post(this.apiBaseUrl + url, data, conf);
      return res;
    } catch (e) {
      console.log(e.message);
    }
  };
  getIntegrationKey = async () => {
    const { IntegrationKey: integration_key } = await this.post(
      this.apiEndpoints.GetUserIntegrationKey,
      {
        Id: this.userId,
      },
    );
    const request_id = crypto.randomBytes(16).toString('hex');
    return { integration_key, request_id };
  };

  getBankAccounts = async () => {
    const res = await this.post(this.apiEndpoints.GetUserInstitutionAccounts, {
      UserInstitutionID: this.userInstitutionId,
    });
    return res;
  };
}
