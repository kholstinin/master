import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";

const domElem = document.getElementById("root");

if (domElem) {
  const root = ReactDOM.createRoot(domElem);

  root.render(<App />);
} else {
  throw new Error("Failed to find root for render!");
}
