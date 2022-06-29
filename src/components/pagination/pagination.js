import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.css'
import { AiOutlineRight,AiOutlineLeft } from "react-icons/ai";
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = {...props};
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

    const onNext = () =>
    {
        if (currentPage !== lastPage) {
          onPageChange(currentPage + 1);
      }
    
  };

  const onPrevious = () => {
      if (currentPage !== 1) {
        onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
  
    <ul
      className={classnames('pagination-container', { [className]: className })}
      >
          
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <AiOutlineLeft className="arrowLeft" />
      </li>
      {paginationRange.map((pageNumber,index) => {
        if (pageNumber === DOTS) {
          return <li key={`pagination${index}`} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <AiOutlineRight className='arrowRight' />
      </li>
    </ul>
  </>);
};

export default Pagination;