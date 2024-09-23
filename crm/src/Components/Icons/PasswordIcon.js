import React from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";
function PasswordIcon(props) {
  const { showpass, setShowpass } = props;
  return (
    <>
      {showpass ? (
        <div
          className="px-1 absolute flex items-center justify-between rounded-r-lg  bg-bgcolor h-full "
          onClick={(e) => {
            setShowpass(false);
          }}
        >
          <BiHide className="text-[#4d4d4d]  text-[22px]" />
        </div>
      ) : (
        <div
          className="px-1 absolute flex items-center justify-between rounded-r-lg  bg-bgcolor h-full "
          onClick={(e) => {
            setShowpass(true);
          }}
        >
          <BiShowAlt className="text-[#4d4d4d]  text-[22px]" />
        </div>
      )}
    </>
  );
}

export default PasswordIcon;
