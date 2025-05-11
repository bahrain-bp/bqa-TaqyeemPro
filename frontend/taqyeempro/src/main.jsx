import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import amplifyConfig from './auth/amplifyConfig';
Amplify.configure(amplifyConfig);


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
