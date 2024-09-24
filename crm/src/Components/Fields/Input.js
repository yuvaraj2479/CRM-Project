import React from "react";
import InputIcons from "../Icons/InputIcons";

function InputComponent(props) {
  return (
    <div className="w-[100%] relative">
      <div className="my-1  w-[100%] px-1">
        <label
          className="text-[14px] tracking-wide text-text-color font-bold my-1
       placeholder:text-[black] placeholder:font-normal leading-[26px]"
        >
          {!props.error ? props.label : props.error}
        </label>
        {props.required === true ? (
          <span className="text-red-700 text-tiny">*</span>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full h-full flex justify-end items-center relative">
        <input
          type={props.type}
          name={props.name}
          autoComplete="off"
          placeholder={props.placeholder ? props.placeholder : props.label}
          className={`w-[100%] border-border-color border text-tiny
         text-primary focus:outline-none h-[40px] font-semibold px-2 rounded-lg focus:borderFocus `}
          value={props.value}
          onChange={(e) => props.handleChange(e)}
          onKeyPress={props.onKeyPress}
          disabled={props.disabled}
          maxLength={props.maxLength}
          minLength={props.minLength}
          max={props.max}
          min={props.min}
          onKeyUp={props.onKeyUp}
          inputMode={props.inputMode} />
        <InputIcons
          name={props.iconname}
          show={props.showpass}
          setShow={props.setShowpass}
        />
      </div>
      {props.type === "email" ? (
        <span
          className="px-2  bg-bgcolor top-0 rounded-lg
         right-0 absolute text-[14px] font-semibold md:tracking-tighter leading-6 tracking-wider"
        >
          @gmail.com
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
export default InputComponent;
