const escapeCell = (value) => {
  const safeValue = value ?? '';
  const str = String(safeValue).replace(/"/g, '""');
  return `"${str}"`;
};

export const exportToCsv = (rows, fileName) => {
  if (!rows || !rows.length) {
    return false;
  }

  const headers = Object.keys(rows[0]);
  const csvLines = [
    headers.map(escapeCell).join(','),
    ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(','))
  ];

  const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
};
