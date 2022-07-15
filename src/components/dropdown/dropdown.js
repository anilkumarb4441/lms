import React, { useRef ,useEffect} from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./dropdown.css";

function Dropdown({
  value,
  dropdownClass = "",
  defaultName = "Select",
  options = [],
  onchange,
}) {
 
  const headRef = useRef();
  const bodyRef = useRef();
  const parentRef = useRef();

  const toggleDropDown = () => {
    parentRef.current.classList.toggle('open');
    bodyRef.current.classList.toggle('open');
    headRef.current.classList.toggle('rotate');
    bodyRef.current.style.maxHeight = bodyRef.current.style.maxHeight === ""
      ? (bodyRef.current.scrollHeight + 10) + "px"
      : "";
  };

  const handleBodyClick = (e)=>{
    if(parentRef.current.contains(e.target)){
      return
    }else{
      parentRef.current.classList.remove('open');
      bodyRef.current.classList.remove('open');
      headRef.current.classList.remove('rotate');
      bodyRef.current.style.maxHeight=''
    } 
}
 

useEffect(()=>{
  window.addEventListener('click',handleBodyClick)
  return ()=>{
    window.removeEventListener('click',handleBodyClick)
  }
})
 



  return (
    <div ref={parentRef} className={dropdownClass + " custom-dropdown"}>
      <div
        ref={headRef}
        className="dropdown-header"
        onClick={() => toggleDropDown()}
      >
        <p>{options.find(opt=>opt.value===value).name?options.find(opt=>opt.value===value).name:defaultName}</p>
        <IoMdArrowDropdown />
      </div>
      <div ref={bodyRef} className="dropdown-body">
        {options &&
          options.length > 0 &&
          options.map((item, i) => {
            return (
              <p
                onClick={() => {
                  onchange(item);
                  toggleDropDown();
                }}
                key={i}
              >
                {item.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default Dropdown;
