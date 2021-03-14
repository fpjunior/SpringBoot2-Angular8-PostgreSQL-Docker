import { TableStandard } from './../models/table.model';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportPDF = (cols: TableStandard[], dataToFillTable: any[], nameArchive: string): void => {
  const doc: any = new jsPDF();
  const body = dataToFillTable
  const head = cols.map(col => { if (col.field != 'operation') { return ({ title: col.header, dataKey: col.field }) } });
  doc.autoTable(head, body);
  doc.save(nameArchive + '.pdf');
}

export const exportXLSX = (dataToFillTable: any[], nameArchive: string): void => {
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(dataToFillTable);
    const workbook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAsExcelFile(excelBuffer, nameArchive);
  });
}

const saveAsExcelFile = (buffer: any, fileName: string): void => {
  import("file-saver").then(FileSaver => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  });
}

