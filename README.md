## Examples

Here are some common ways to use the CLI Datatoolkit:

- **Calculate statistics for the 'age' column:**
  `pnpm start -- stats --file data/people.csv --column age`
- **Filter people named 'John':**
  `pnpm start -- filter --file data/people.csv --column name --value John`
- **Sort by 'age' in descending order:**
  `pnpm start -- sort --file data/people.csv --column age --order desc`
- **Export filtered data to a new file:**
  `pnpm start -- filter --file data/people.csv --column name --value Jane --out filtered_jane.csv`
- **Show help information:**
  `pnpm start -- help`

## How it works

This tool is built with Node.js and uses command-line arguments to perform operations (stats, filter, sort) on CSV files.
It reads the data, processes it, and either logs the results or exports them to a new CSV file.

## Common errors

- **Error: Missing required argument --file:** Make sure you provide the `--file` flag followed by the path to your CSV file.
- **Error writing output file: toCsv is not a function:** This happens if the `toCsv` function isn't correctly exported in `src/lib/csv.js`.
- **WARN Local package.json exists, but node_modules missing, did you mean to install?:** Run `pnpm install` in your terminal to install dependencies.
