const fs = require("fs");
const path = require("path");
const { parseArgs } = require("util");
const { parseCsv, toCsv } = require("./lib/csv");
const { calculateStats, filterRows, sortRows } = require("./lib/ops");

console.log("CLI- Datatoolkit-week1"); // This can be removed later as per Lesson 1 instructions

// ... (بقیه کد index.js که پارامترها را می‌خواند) ...

/**
 * Main function to run the command line tool.
 */
async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      file: { type: "string", short: "f" },
      column: { type: "string", short: "c" },
      value: { type: "string", short: "v" },
      order: { type: "string", short: "o", default: "asc" },
      out: { type: "string", short: "O" }, // Option for output file
    },
    allowPositionals: true,
  });

  const [command] = positionals;

  if (!command) {
    console.error(
      "Error: No command specified (e.g., stats, filter, sort, export).",
    );
    process.exit(1);
  }

  // Handle help command (Lesson 7 requirement)
  if (command === "help") {
    // Implement full help message display here
    console.log("Usage: pnpm start -- <command> [options]");
    console.log("Commands: stats, filter, sort, export");
    console.log(
      "Options: --file <path>, --column <name>, --value <value>, --order <asc|desc>, --out <path>",
    );
    return;
  }

  if (!values.file) {
    console.error("Error: Missing required argument --file.");
    process.exit(1);
  }

  const filePath = path.join(process.cwd(), values.file);
  let rows;

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    rows = parseCsv(fileContent);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }

  let result;
  switch (command) {
    case "stats":
      if (!values.column) {
        console.error(
          "Error: Missing required argument --column for stats command.",
        );
        process.exit(1);
      }
      result = calculateStats(rows, values.column);
      break;
    case "filter":
      if (!values.column || !values.value) {
        console.error(
          "Error: Missing required arguments --column or --value for filter command.",
        );
        process.exit(1);
      }
      result = filterRows(rows, values.column, values.value);
      break;
    case "sort":
      if (!values.column) {
        console.error(
          "Error: Missing required argument --column for sort command.",
        );
        process.exit(1);
      }
      result = sortRows(rows, values.column, values.order);
      break;
    case "export": // Handle the export command (new)
      // Export command just needs the file path, no extra logic needed here, it uses the existing rows
      result = rows;
      break;
    default:
      console.error(`Error: Unknown command "${command}".`);
      process.exit(1);
  }

  // Handle output logic
  if (values.out) {
    // If --out argument is provided, write to a new CSV file
    try {
      const outputCsvContent = toCsv(result); // Use the toCsv function from csv.js
      const outputPath = path.join(process.cwd(), values.out);
      fs.writeFileSync(outputPath, outputCsvContent, "utf8");
      console.log(`Successfully exported data to ${outputPath}`);
    } catch (error) {
      console.error(`Error writing output file: ${error.message}`);
      process.exit(1);
    }
  } else {
    // Otherwise, log the result to the console (standard behavior)
    console.log(result);
  }
}

main().catch(console.error);
