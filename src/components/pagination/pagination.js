import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    pageSizeOptions = [],
    currentPage,
    pageSize,
    className,
  } = { ...props };

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  

  const onNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1, pageSize);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1, pageSize);
    }
  };
  

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div className ="pagination-bar" style={{justifyContent:pageSizeOptions?.length > 0?'space-between':'center'}}>
      {pageSizeOptions?.length > 0 && (
        <div className="pageSizeOpt" >
          <span>Show</span>
        <select className = "customInput" name = "pageSize" value={pageSize} onChange={(e)=>onPageChange(1, parseInt(e.target.value))}>
          {pageSizeOptions.map((number, i) => {
            return (
              <option key={i} value={number}>
                {number}
              </option>
            );
          })}
        </select>
        <span>Entries</span>
        </div>
      )}
      {/* <input type='number' name = "pageSize" value={pageSize} onChange={(e)=>onPageChange(1, parseInt(e.target.value))} /> */}

     {currentPage === 0 || paginationRange?.length < 2?<></>:<ul
        className={classnames("pagination-container", {
          [className]: className,
        })}
      >
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <AiOutlineLeft className="arrowLeft" />
        </li>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`pagination${index}`} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber,pageSize)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <AiOutlineRight className="arrowRight" />
        </li>
      </ul>
    }</div>
  );
};

export default Pagination;
