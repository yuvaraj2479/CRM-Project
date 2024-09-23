import React from "react";

function ButtonComponent(props) {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      className={`${props.className ? props.className : "w-auto"} h-[34px] 
       text-white px-10 ${props.disabled === true
          ? "bg-[#b6c1d6] hover:bg-[#e8ecf3] "
          : "bg-primary hover:bg-[#282828c2] "
        }  tracking-widest    mx-2  text-base my-1`}
      onClick={props.onClick}
    // color="Blue"
    >
      {props.name}
    </button>
  );
}
export default ButtonComponent;
