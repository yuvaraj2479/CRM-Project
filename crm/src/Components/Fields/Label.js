import React from 'react';

function Label({ required, label, className }) {
  return (
    <label
      className={`text-tiny tracking-wide  text-h1-text-color  placeholder:text-black placeholder:font-normal  ${className ?? ' leading-[26px] my-1'}`}
    >
      {label}{' '}
      {required ? (
        <span id="required" className=" text-tiny text-[#ff5d48]">
          *
        </span>
      ) : null}
    </label>
  );
}

export default Label;