import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { AuthContextProider } from "./store/auth-context";

ReactDOM.render(
  <AuthContextProider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProider>,
  document.getElementById("root")
);
