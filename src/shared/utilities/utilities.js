import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// export const changeTableSortIcons = (columns, sortedColumn) => {
//   return columns.map((col) => {
//     if (col.id === sortedColumn.id) {
//       if (col.sortDirection === null) {
//         col.sortDirection = globalConstants.SORT.ASC;
//       } else if (col.sortDirection === globalConstants.SORT.ASC) {
//         col.sortDirection = globalConstants.SORT.DESC;
//       } else if (col.sortDirection === globalConstants.SORT.DESC) {
//         col.sortDirection = globalConstants.SORT.ASC;
//       }

//       return col;
//     } else {
//       return {
//         ...col,
//         sortDirection: null,
//       };
//     }
//   });
// };
export const exportToExcel = (data, columns, filename) => {
  console.log(data);
  console.log(columns);
  console.log(filename);
  const worksheetData = [
    columns.map((column) => column.label),
    ...data.map((row) => columns.map((column) => row[column.key])),
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(excelBlob, `${filename}.xlsx`);
};

export const exportToExcelDaily = (data, columns, filename) => {
  const worksheetData = [
    columns.map((column) => column.label),
    ...data.map((row) =>
      columns.map((column) => {
        if (column.key === "usedbreaks") {
          console.log(row);
          return row.usedbreaks
            .map((breakItem) => `${breakItem.breakKey}=${breakItem.breakValue}`)
            .join(", ");
        }
        return row[column.key];
      })
    ),
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(excelBlob, `${filename}.xlsx`);
};

export const formateTime = (time) => {
  const startTime = new Date(time); // Create a Date object

  const newTime = startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return newTime;
};
 export const formattedDate = (date) => {
  console.log(date,"....../formatted date Function")
  
    date = new Date(date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };