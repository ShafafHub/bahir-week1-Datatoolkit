/**
 * Converts a CSV string into an array of objects.
 * @param {string} text The CSV data as a string.
 * @returns {Array<object>} An array of objects representing the CSV rows.
 */
function parseCsv(text) {
  // Add a guard for empty files
  if (!text.trim()) return [];

  const lines = text.trim().split("\n");
  // این خط تغییر کرده: map را اضافه کردیم تا همه هدرها را به حروف کوچک تبدیل کند
  const headers = lines[0]
    .split(",")
    .map((header) => header.trim().toLowerCase());
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j].trim()] = values[j].trim();
    }
    rows.push(row);
  }

  return rows;
}

/**
 * Converts an array of objects back into a CSV string. (Lesson 6)
 * @param {Array<object>} rows The array of data objects.
 * @returns {string} The CSV data as a string.
 */
function toCsv(rows) {
  if (!rows || rows.length === 0) return "";

  // Extract headers from the first row object keys
  const headers = Object.keys(rows[0]);
  const csvLines = [];

  // Add header line
  csvLines.push(headers.join(","));

  // Add data rows
  for (const row of rows) {
    const values = headers.map((header) => row[header]);
    csvLines.push(values.join(","));
  }

  return csvLines.join("\n");
}

// Export the functions for use in other parts of the application (e.g., index.js)
module.exports = {
  parseCsv,
  toCsv,
};
