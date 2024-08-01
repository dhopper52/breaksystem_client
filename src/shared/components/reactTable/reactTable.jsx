import DataTable from "react-data-table-component";

const ReactTable = (props) => {
  const {
    columns,
    items = [],
    progressPending,
    responsive = true,
    striped = true,
    highlightOnHover = true,
    pointerOnHover = false,
    dense = false,
    noTableHead = false,
    persistTableHead = true,
    noDataComponent = (
      <div className="w-100 p-2 no-data d-flex justify-content-center align-items-center">
        <div>
          <div className="emptyText">
            <p>No data</p>
          </div>
        </div>
      </div>
    ),
    disabled = false,
    direction,
    onRowClicked,
    onRowDoubleClicked,
    onRowMouseEnter,
    onRowMouseLeave,
    onColumnOrderChange,
    defaultSortFieldId,
    defaultSortAsc,
    sortIcon,
    onSort,
    handleColumnClick,
    selectableRows = false,
    clearSelectedRows = false,
    handleRowSelectionChange,
    expandableRows = false,
    pagination = true,
    noHeader = true,
    fixedHeader = true,
  } = props;

  // const formattedColumns = columns.map((column) => {
  //   if (column.sortable) {
  //     return {
  //       ...column,
  //       name: (
  //         <div
  //           className="d-flex w-100"
  //           onClick={() =>
  //             handleColumnClick ? handleColumnClick(column.id) : null
  //           }
  //         >
  //           {column.name}
  //           <div className="ms-2 d-flex">
  //             {column.sortDirection === null && (
  //               <i className="fa fa-sort sort-arrows sortable-arrow"></i>
  //             )}
  //             {column.sortDirection === globalConstants.SORT.ASC && (
  //               <i className="fa fa-sort-up sortable-arrow"></i>
  //             )}
  //             {column.sortDirection === globalConstants.SORT.DESC && (
  //               <i className="fa fa-sort-down sortable-arrow"></i>
  //             )}
  //           </div>
  //         </div>
  //       ),
  //     };
  //   } else {
  //     return column;
  //   }
  // });

  return (
    <div className="w-100 ReactDataTable mt-5">
      <DataTable
        progressPending={progressPending}
        columns={columns}
        data={items}
        responsive={responsive}
        striped={striped}
        highlightOnHover={highlightOnHover}
        pointerOnHover={pointerOnHover}
        dense={dense}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        noTableHead={noTableHead}
        persistTableHead={persistTableHead}
        noDataComponent={noDataComponent}
        disabled={disabled}
        direction={direction}
        onRowClicked={onRowClicked}
        onRowDoubleClicked={onRowDoubleClicked}
        onRowMouseEnter={onRowMouseEnter}
        onRowMouseLeave={onRowMouseLeave}
        onColumnOrderChange={onColumnOrderChange}
        defaultSortFieldId={defaultSortFieldId}
        defaultSortAsc={defaultSortAsc}
        sortIcon={sortIcon}
        sortServer={false}
        onSort={onSort}
        selectableRows={selectableRows}
        clearSelectedRows={clearSelectedRows}
        onSelectedRowsChange={handleRowSelectionChange}
        expandableRows={expandableRows}
        pagination={pagination}
        paginationServer={false}
        noHeader={noHeader}
        fixedHeader={fixedHeader}
      />
    </div>
  );
};

export default ReactTable;
