import React,{useState,useEffect,useRef,useMemo} from 'react'
import { useTable, useGlobalFilter, useAsyncDebounce,useRowSelect } from "react-table"; 

import "./index.css"

//assets
import editIcon from "../../assets/icons/editIcon.svg"
import deleteIcon from "../../assets/icons/editIcon.svg"
import downArrow from "../../assets/icons/selectArr.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"

//components
import Pagination from "../pagination/pagination"
import NoRecord from '../noRecord/noRecord';

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);
  
      return <input type="checkbox" ref={resolvedRef} {...rest} />;
    }
  );
 

function Table(options) {
    const columns = useMemo(() => options.columns, [options.columns]);
    const data = useMemo(() => options.data, [options.data]);
    const [cellWidth,setCellWidth] = useState('')
    const tableInstance = useTable({ columns, data },useRowSelect, hooks => {
        if(!options.selectRows){
          return
        }
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) =>  {
              return(
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            )},
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => {
              return(
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )},
          },
          ...columns,{
            Header:"",
            accessor:"actions",
            Cell: (Cell) => (
              <div className="k">
                <img src={editIcon} onClick = {()=>options.handleEdit(Cell.row.original)} />
                <img src={deleteIcon} onClick = {()=>{deleteSingleRow(Cell)}} />
              </div>
            )
          }
        ])
      }, useGlobalFilter);
      const arrowRef = useRef(null);
      const showBodyRef = useRef(null);
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
        selectedFlatRows,
        getToggleHideAllColumnsProps,
        state,
        setGlobalFilter,
      } = tableInstance;
    
      const { selectedRowIds,globalFilter } = state;
    
      const [status, setStatus] = useState("");
      const [paymentStatus, setPaymentStatus] = useState("");
      const [value, setValue] = useState(globalFilter);
    
      const toggleSearch = (e) => {
        let sInput = document.getElementsByClassName("searchBarInput")[0];
        sInput.classList.toggle("active");
        e.target.classList("toggle");
      };
      const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
      }, 200);
    
      const openColumns = (e) => {
        let a  = showBodyRef.current
        let b = arrowRef.current
        a.classList.toggle("active");
        a.style.height = a.style.height===''?a.scrollHeight + 'px':''
        b.classList.toggle("active");
      };
    
      const handleDelete = (rows)=>{
        let newRows = rows.filter(rowObj=>rowObj.isSelected!==true)
        let newArr = []
        newRows.forEach(rowObj=>{
               let newObj = {...rowObj.original}
               newArr=[...newArr,newObj]
        })
        options.handleDelete(newArr);
      }
    
      const deleteSingleRow = (Cell)=>{
        let newRows = Cell.rows.filter(obj=>obj.id!==Cell.row.id)
        let newArr = []
        newRows.forEach(rowObj=>{
               let newObj = {...rowObj.original}
               newArr=[...newArr,newObj]
        })
        options.handleDelete(newArr);
      }

      useEffect(()=>{
        setCellWidth(100/options.columns.length)
      },[options.columns])


    return (
        <>
        <div className="tableHeader">
          <div className="tableHeader1">
          {options.showColumns &&  <div className="showColumns">
              <div className="showColumnsHeader">
                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
                <label>Show Columns</label>
                <img
                  className="showColArr"
                  ref={arrowRef}
                  src={downArrow}
                  alt="down"
                  onClick={(e) => openColumns(e)}
                />
              </div>
              <div className="showColumnsBody" ref={showBodyRef}>
                {allColumns.map((column) => (
                  <div key={column.id}>
                    <label>
                      <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                      {column.id && column.id.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            }
            
            {options.deleteAll && <img src = {deleteIcon} className = "deleteIcon" alt = "delete" onClick = {()=>handleDelete(rows)}/>}
          </div>
          <div className="tableHeader2">
          { options.search && <div className="searchBar">
              <input
                className="searchBarInput"
                type="search"
                name="search"
                value={value || ""}
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
              />
              <img
                onClick={() => toggleSearch()}
                src={searchIcon}
                alt="searchIcon"
              />
            </div>
           } 
          </div>
        </div>
        <div ref = {options.wrapperRef} className={"TableContainer " + options.tClass}>
        {options.data && options.data.length>0? <table className={"Table " + options.tClass} {...getTableProps()}>
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr  {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props style = {{width:cellWidth+'%'}}
                        <th  {...column.getHeaderProps()}>
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
         {
          <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {
                        // Loop over the rows cells
                        row.cells.map((cell) => {
                          // Apply the cell props
                          return (
                            <td  {...cell.getCellProps()}>
                              {
                                // Render the cell contents
                                cell.render("Cell")
                              }
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
}
          </table>:<NoRecord/>
       } </div>
        {
                options.pagination &&
              
        <Pagination
        className="pagination-bar"
        currentPage={options.currentPage}
        totalCount={options.totalCount}
        pageSize={options.pageSize}
        pageSizeOptions = {options.pageSizeOptions}
        onPageChange={(number,size) => {options.onPageChange(number,size)}}
      />
              
       }
      </>
    )
}

export default Table
