import { useEffect, useState } from "react";
import axios from "axios";
import sophtron from "./sophtron-widget-loader";

export const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/test/accounts");
        setAccounts(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Accounts</h1>
      {accounts.length && (
        <table>
          <thead>
            <td>AccountName</td>
            <td>AccountNumber</td>
            <td>Balance</td>
            <td>LastUpdated</td>
          </thead>
          <tbody>
            {accounts.map(
              ({ AccountName, AccountNumber, Balance, LastUpdated }) => (
                <tr>
                  <td>{AccountName}</td>
                  <td>{AccountNumber}</td>
                  <td>{Balance}</td>
                  <td>{LastUpdated}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </>
  );
};
