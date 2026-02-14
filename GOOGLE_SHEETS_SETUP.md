# Google Sheets Integration Setup

## Steps to Connect Your Contact Form to Google Sheets

### 1. Open Your Google Sheet
Go to: https://docs.google.com/spreadsheets/d/1uRWLLN72zNJYgRVXYRR7ZfMDkS78ZLh7_9QLIsfOz7A/edit

### 2. Open Apps Script Editor
- Click **Extensions** → **Apps Script**
- Delete any existing code in the editor

### 3. Add the Script
- Copy all code from `google-sheets-script.js` in this project
- Paste it into the Apps Script editor
- Click **Save** (💾 icon or `Ctrl+S`)
- Give it a name like "Contact Form Handler"

### 4. Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description**: "Contact form endpoint" (optional)
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. Review permissions:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)** if warned
   - Click **Allow**
7. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/XXX/exec`)

### 5. Update Your Environment Variables
1. Open `.env.local` in your project
2. Replace `YOUR_WEB_APP_URL_HERE` with the Web App URL you copied
3. Save the file

Example:
```
VITE_GOOGLE_SHEETS_ENDPOINT=https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXX/exec
```

### 6. Restart Your Dev Server
```bash
npm run dev
```

### 7. Test the Form
- Fill out your contact form
- Submit it
- Check your Google Sheet for the new row with: Timestamp, Name, Email, Message

## Troubleshooting

**CORS Error (blocked by CORS policy)?**
- The Apps Script must include the `doOptions` function to handle preflight requests
- Copy the UPDATED `google-sheets-script.js` code (includes CORS headers)
- In Apps Script editor: Deploy → **Manage deployments** → Click ✏️ Edit → **New version** → Deploy
- The endpoint URL stays the same, no need to update `.env.local`

**"Missing Google Sheets endpoint" error?**
- Make sure `.env.local` has the correct URL
- Restart your dev server after updating `.env.local`

**Form submits but data doesn't appear?**
- Check the Apps Script deployment is set to "Execute as: Me" and "Anyone" can access
- Run the `testSheetAccess()` function in Apps Script editor to verify permissions

**"Failed to send message" error?**
- Check browser console for CORS or network errors
- Verify the Web App URL is correct and deployed (not a test URL)

## Sheet Structure

Your sheet will automatically have these columns:
- **Timestamp** - ISO format date/time
- **Name** - Contact's name
- **Email** - Contact's email
- **Message** - Message content
