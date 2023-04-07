import "./App.css";
import sophtron from "./sophtron-widget-loader";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [displayWidget, setDisplayWidget] = useState('none');
  const navigate = useNavigate();
  const onFinish = (data) => {
    console.log(data);
    navigate("accounts");
  };

  const showWidget = () => {
    setDisplayWidget('block');
    sophtron.show();
  }

  const hideWidget = () => {
    setDisplayWidget('none');
    sophtron.hide();
  }

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { integration_key, request_id },
        } = await axios.get("http://localhost:4000/test");
        sophtron.init(
          "Add",
          {
            env: "preview",
            partner: "default",
            integration_key,
            request_id,
            institution_id: "926623ca-5952-4921-8f77-2023f1cdde8e",
            userInstitution_id: "16908c13-b4bd-4dde-bae0-158d1bbf8c7d",
            onFinish,
          },
          true
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <button onClick={showWidget}>Add</button>
        <button onClick={hideWidget}>Hide</button>
      </div>
      <div id='sophtron' style={{ width: 500, height: 500, background: 'red', display: displayWidget }}>
        Sophtron
      </div>
    </div>
  );
}

export default App;
