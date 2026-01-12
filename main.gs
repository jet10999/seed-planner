// Globally-scoped testReadAllSeeds for frontend testing
function testReadAllSeeds() {
  return [
    { uuid: "123", Flower: "Test Flower", Height: "10" },
    { uuid: "456", Flower: "Another Flower", Height: "20" }
  ];
}
// Simple test function to verify frontend-backend connection
function testHello() {
  return "Hello from Apps Script!";
}

// Simple test function to return static seed data
function testReadAllSeeds() {
  return [
    { uuid: "123", Flower: "Test Flower", Height: "10" },
    { uuid: "456", Flower: "Another Flower", Height: "20" }
  ];
}
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Helper for including HTML partials
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Generates a UUID v4 string.
 */
function generateUUID() {
  return Utilities.getUuid();
}

/**
 * Adds a UUID to each row in the sheet if missing.
 * Assumes the UUID column is named 'uuid'.
 */
function addUUIDsToRows() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('seed-planner');
  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0];
  const uuidCol = headers.indexOf('uuid');
  if (uuidCol === -1) {
    throw new Error("No 'uuid' column found. Please add a 'uuid' column to your table header.");
  }
  let updated = false;
  for (let i = 1; i < values.length; i++) {
    if (!values[i][uuidCol]) {
      sheet.getRange(i + 1, uuidCol + 1).setValue(generateUUID());
      updated = true;
    }
  }
  return updated;
}

/**
 * Finds the row index (1-based, relative to the table) for a given UUID.
 */
function findRowByUUID(uuid) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('seed-planner');
  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0];
  const uuidCol = headers.indexOf('uuid');
  if (uuidCol === -1) {
    throw new Error("No 'uuid' column found. Please add a 'uuid' column to your table header.");
  }
  for (let i = 1; i < values.length; i++) {
    if (values[i][uuidCol] === uuid) {
      return i; // 1-based, relative to table (not sheet)
    }
  }
  return -1;
}

const SHEET_NAME = 'seed-planner';
const TABLE_RANGE = 'tbl-seeds';

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function readAllSeeds() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values.shift();
  return values.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function addSeed(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const range = sheet.getDataRange();
  const headers = range.getValues()[0];
  // Ensure UUID is set
  if (!data['uuid']) {
    data['uuid'] = generateUUID();
  }
  const newRow = headers.map(h => data[h] || '');
  sheet.appendRow(newRow);
}

function updateSeedByUUID(uuid, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0];
  const rowIndex = findRowByUUID(uuid); // 1-based, relative to table
  if (rowIndex === -1) throw new Error('UUID not found');
  headers.forEach((h, i) => {
    if (data[h] !== undefined) {
      sheet.getRange(rowIndex + 1, i + 1).setValue(data[h]);
    }
  });
}

function deleteSeedByUUID(uuid) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const range = sheet.getDataRange();
  const rowIndex = findRowByUUID(uuid); // 1-based, relative to table
  if (rowIndex === -1) throw new Error('UUID not found');
  sheet.deleteRow(rowIndex + 1);
}