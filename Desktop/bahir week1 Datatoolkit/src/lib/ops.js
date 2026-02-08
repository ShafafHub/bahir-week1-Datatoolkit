/**
 * Calculates statistics (count, min, max, average) for a specific column in an array of rows.
 * @param {Array<object>} rows The array of data objects.
 * @param {string} columnName The name of the column to analyze.
 * @returns {object} An object containing the statistics.
 */
function calculateStats(rows, columnName) {
  let count = 0;
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;

  for (const row of rows) {
    const value = Number(row[columnName]);

    if (!isNaN(value)) {
      count++;
      sum += value;
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  const avg = count > 0 ? sum / count : 0;

  return { count, min, max, avg };
}

/**
 * Filters rows based on a column value (Lesson 4).
 * @param {Array<object>} rows
 * @param {string} column
 * @param {string} value
 * @returns {Array<object>}
 */
function filterRows(rows, column, value) {
  // Add a guard for empty files
  if (!rows || rows.length === 0) return [];

  return rows.filter((row) => {
    const cellValue = String(row[column]).toLowerCase();
    const searchValue = String(value).toLowerCase();
    //
    return cellValue.includes(searchValue);
  });
}

/**
 * Sorts rows based on a column and order (Lesson 5).
 * @param {Array<object>} rows
 * @param {string} column
 * @param {'asc' | 'desc'} order
 * @returns {Array<object>}
 */
function sortRows(rows, column, order = "asc") {
  return rows.sort((a, b) => {
    let valA = a[column];
    let valB = b[column];

    //
    const isNumeric = !isNaN(valA) && !isNaN(valB);

    let comparison = 0;
    if (isNumeric) {
      comparison = Number(valA) - Number(valB);
    } else {
      comparison = String(valA).localeCompare(String(valB));
    }

    //
    return order === "asc" ? comparison : -comparison;
  });
}

// Export the functions for use in other parts of the application (e.g., index.js)
module.exports = {
  calculateStats,
  filterRows,
  sortRows,
};
