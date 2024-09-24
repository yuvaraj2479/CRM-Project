import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import PasswordIcon from "./PasswordIcon";

function InputIcons({ name, show, setShow }) {
  switch (name) {
    case "email":
      return (
        <div className="px-1 absolute flex items-center justify-between rounded-r-lg  bg-bgcolor h-full">
          <AiOutlineMail className="text-[#4d4d4d] text-[20px]" />
        </div>
      );
    case "password":
      return <PasswordIcon showpass={show} setShowpass={setShow} />;
    case "name":
      return (
        <div className="px-1 absolute flex items-center justify-between rounded-r-lg  bg-bgcolor h-full">
          <AiOutlineUser className="text-[#4d4d4d] text-[20px]" />
        </div>
      );
    case "phone":
      return (
        <div className="px-1 absolute flex items-center justify-between rounded-r-lg  bg-bgcolor h-full">
          <AiOutlinePhone className="text-[#4d4d4d] text-[20px]" />
        </div>
      );
    case "amount":
      return (
        <div className="px-1 absolute flex items-center justify-between rounded-r-lg  bg-bgcolor h-full">
          <FaRupeeSign className="text-[#4d4d4d] text-[20px]" />
        </div>
      );
    default:
      return null;
  }
}

export default InputIcons;
