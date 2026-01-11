# Project Setup Instructions

## 1. Initialize Git
Run the following command in your project directory:

    git init

## 2. Install and Configure clasp
- Install clasp globally:

    npm install -g @google/clasp

- Authenticate clasp:

    clasp login

- Create a new Apps Script project linked to a Google Sheet:


**File Naming Rule:**
Use the `.gs` extension for your Apps Script files (e.g., `main.gs` instead of `main.js`) to match the Apps Script environment. This helps with clarity and organization, as Apps Script natively uses `.gs` files.

If you create new files, save them as `.gs`.

## 3. .gitignore Setup
Create a .gitignore file to exclude unnecessary files:
- node_modules/
- .clasp.json
- .env
- *.log

## 4. Data Formatting Advice
Format your Google Sheet data as a table:
- Use the first row for column headers.
- Each subsequent row represents an item.

This structure makes CRUD operations and rendering in different views easier.

## 5. Next Steps
- Provide your column headers and sheet name when ready.
- Implement views: HTML table, scrollable cards, grid view.
- Enable CRUD operations by clicking items in any view.
