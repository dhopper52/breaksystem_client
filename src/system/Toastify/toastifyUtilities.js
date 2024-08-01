import { toast } from "react-toastify";

const showError = (message) => {
  toast.error(message);
};
const showSuccess = (message) => {
  toast.success(message);
};
export const ToastifyUtilities = {
  showError,
  showSuccess,
};
