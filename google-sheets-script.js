// Google Apps Script to receive form submissions and save to Google Sheets
// Instructions:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A/edit
// 2. Go to Extensions > Apps Script
// 3. Delete any existing code and paste this entire script
// 4. Save the script (File > Save)
// 5. Deploy as Web App (Deploy > New Deployment):
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copy the Web App URL and paste it in your .env.local file

function doGet(e) {
  try {
    // Get query parameters
    const params = e.parameter;
    
    // Open the specific Google Sheet by ID
    const sheet = SpreadsheetApp.openById('1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A').getSheetByName('Sheet1');
    
    // If Sheet1 doesn't exist, create it
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById('1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A').insertSheet('Sheet1');
      // Add headers
      newSheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    const targetSheet = sheet || SpreadsheetApp.openById('1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A').getSheetByName('Sheet1');
    
    // If this is the first row, add headers
    if (targetSheet.getLastRow() === 0) {
      targetSheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    // Append the data
    targetSheet.appendRow([
      params.timestamp || new Date().toISOString(),
      params.name || '',
      params.email || '',
      params.message || ''
    ]);
    
    // Return success response (CORS is handled automatically for GET requests)
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Parse form-encoded data (application/x-www-form-urlencoded)
    const data = e.parameter;
    
    // Open the specific Google Sheet by ID
    const sheet = SpreadsheetApp.openById('1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A').getSheetByName('Sheet1');
    
    // If Sheet1 doesn't exist, create it
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById('1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A').insertSheet('Sheet1');
      // Add headers
      newSheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    const targetSheet = sheet || SpreadsheetApp.openById('1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A').getSheetByName('Sheet1');
    
    // If this is the first row, add headers
    if (targetSheet.getLastRow() === 0) {
      targetSheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    // Append the data
    targetSheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.message || ''
    ]);
    
    // Return success response (no CORS issues with form-encoded POST)
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify sheet access
function testSheetAccess() {
  const sheet = SpreadsheetApp.openById('1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A');
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Sheet URL: ' + sheet.getUrl());
}
