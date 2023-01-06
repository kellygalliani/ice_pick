import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import SentenceProvider from "./contexts/sentenceContext";
import UserProvider from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { GlobalStyle } from "./styles/globalStyles";
import LoadingProvider from './contexts/loadingContext';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer />
    <LoadingProvider>
      <UserProvider>
        <SentenceProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SentenceProvider>
      </UserProvider>
    </LoadingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
