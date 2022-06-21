import React, { useState } from "react";
import "./index.css";

function Input({
  element,
  name,
  placeholder,
  label,
  required = true,
  inputClass='',
  change,
  pattern,
  value,
  type,
  accept,
  selectArr,
  selectHeading,
  id,
  checked,
  multiple,
  disable
})
  
{
  return (
    <div
      className={
        type === "radio" || type ==="checkbox"
          ? `customInputHolder ${type} ${inputClass}`
          : `customInputHolder ${inputClass}`
      }
    >
      {label && <p>{label}</p>}
      {!element && (
        <input
          type={type}
          className={
            type === "radio" || type ==="checkbox"
              ? `customInput ${type} ${inputClass}`
              : `customInput ${inputClass}`
          }
          value={value}
          onChange={(e) => change(e)}
          pattern={pattern}
          placeholder={placeholder}
          name={name}
          required={required}
          accept={accept}
          id={id}
          checked={checked}
          multiple={multiple}
          disabled={disable}
        />
      )}
      {type === "file" && (
        <div className="customInputFileBar">
          <p>{value !== "" || null || undefined ? value : "Choose file"}</p>
          <label for={id}>Browse</label>
        </div>
      )}
      {element && element === "textarea" && (
        <textarea
          className={"customInput " + inputClass}
          value={value}
          onChange={(e) => change(e)}
          pattern={pattern}
          placeholder={placeholder}
          name={name}
          required={required}
        />
      )}
      {element && element === "select" && (
        <select
          className={"customInput " + inputClass}
          value={value}
          onChange={(e) => change(e)}
          pattern={pattern}
          placeholder={placeholder}
          name={name}
          required={required}
        >
          {selectHeading !== undefined && (
            <option value="" disabled selected hidden>
              {selectHeading}
            </option>
          )}
          {selectArr &&
            selectArr.map((item, i) => {
              return (
                <option key={i} value={item.value}>
                  {item.name}
                </option>
              );
            })}
        </select>
      )}
    </div>
  );
}

export default Input;
