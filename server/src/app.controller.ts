import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIntegrationKey() {
    try {
      return this.appService.getIntegrationKey();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('accounts')
  getBankAccounts() {
    try {
      return this.appService.getBankAccounts();
    } catch (e) {
      console.log(e);
    }
  }
}
