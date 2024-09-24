// GlobalToast.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalToast = () => {
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export const showSuccessToast = (message, autoCloseTime = 3000,callback) => {
    toast.success(message, {
      position: "top-right",
      autoClose: autoCloseTime, // Dynamically set auto close time
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: callback,
    });
  };    
  
  export const showErrorToast = (message, autoCloseTime = 3000) => {
    toast.error(message, {
      position: "top-right",
      autoClose: autoCloseTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  

export default GlobalToast;
