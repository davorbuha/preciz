import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { PregledType } from '../../containers/Izvjesca/PregledVaganja';

const headerOptions: Partial<ExcelJS.Column> = {
	alignment: { horizontal: 'center', vertical: 'middle' },
	font: { bold: true, size: 11, name: 'Calibri' },
	fill: { fgColor: { argb: 'C0C0C0C0' }, type: 'pattern', pattern: 'solid' },
	border: {
		bottom: { color: { argb: '00000000' }, style: 'thin' },
		left: { color: { argb: '00000000' }, style: 'thin' },
		right: { color: { argb: '00000000' }, style: 'thin' },
		top: { color: { argb: '00000000' }, style: 'thin' },
	},
};

const cellOptions: Partial<ExcelJS.Column> = {
	alignment: { horizontal: 'left', vertical: 'middle' },
	font: { size: 10, name: 'Calibri' },
	border: {
		bottom: { color: { argb: '008000' }, style: 'thin' },
		left: { color: { argb: '008000' }, style: 'thin' },
		right: { color: { argb: '008000' }, style: 'thin' },
		top: { color: { argb: '008000' }, style: 'thin' },
	},
	fill: { fgColor: { argb: 'e0f0dc' }, type: 'pattern', pattern: 'solid' },
};

export async function storeExcel(data: PregledType[], name: string) {
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet('List1');
	sheet.columns = [
		{ header: 'REDNI BROJ', key: 'brojVaganja', width: 18 },
		{ header: 'TS1', key: 'ts1', width: 10 },
		{ header: 'TS2', key: 'ts2', width: 10 },
		{ header: 'IME I PREZIME VOZAČA', key: 'vozac', width: 27 },
		{ header: 'ROBA', key: 'roba', width: 12 },
		{ header: 'MJESTO UTOVARA/ISTOVARA', key: 'mjestoIsporuke', width: 30 },
		{ header: 'BRUTO', key: 'bruto', width: 12 },
		{ header: 'NETO', key: 'neto', width: 12 },
		{ header: 'TARA', key: 'tara', width: 12 },
	];

	const firstrow = sheet.getRow(1);
	firstrow.fill = headerOptions.fill;
	firstrow.font = headerOptions.font;
	firstrow.alignment = headerOptions.alignment;
	firstrow.border = headerOptions.border;

	const rows = sheet.addRows(data.map(item => ({ ...item, ts1: item.ts1.toDate(), ts2: item.ts2.toDate() })));
	rows.forEach((row, index) => {
		row.font = cellOptions.font;
		row.alignment = cellOptions.alignment;
		row.border = cellOptions.border;
		if (index % 2 === 0) {
			row.fill = cellOptions.fill;
		}
	});
	sheet.autoFilter = {
		from: {
			row: 1,
			column: 1,
		},
		to: {
			row: data.length + 1,
			column: 9,
		},
	};
	const buffer = await workbook.xlsx.writeBuffer();
	const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	const fileExtension = '.xlsx';
	const blob = new Blob([buffer], { type: fileType });
	saveAs(blob, name + fileExtension);
}
