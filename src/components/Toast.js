import reactDom from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = () => {
  return reactDom.createPortal(<ToastContainer />, document.body);
};
