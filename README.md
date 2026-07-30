# USCCB Daily Readings to Google Calendar Sync

An automated Google Apps Script that fetches daily Roman Catholic Mass readings directly from the USCCB (United States Conference of Catholic Bishops) RSS feed and syncs them seamlessly to a dedicated Google Calendar.

## Features
* **Direct USCCB Fetching:** Bypasses CORS and bot blocks by employing custom request headers.
* **Smart Event Scheduling:** Creates clean, timed calendar entries (6:00 AM) with clean descriptions (HTML tags stripped).
* **Automatic Phone Reminders:** Configured to trigger daily push notifications (e.g., at 7:00 AM) directly on synced mobile devices.
* **Duplicate Protection:** Automatically detects and purges duplicate entries before adding updated readings for any given day.
* **Configurable via Script Properties:** Securely reads configuration values (like calendar names) using Google Apps Script environment variables.

---

## Setup Instructions

### 1. Create the Script
1. Open [Google Apps Script](https://script.google.com).
2. Create a **New Project**.
3. Replace the default code in `Code.gs` with the project's script code.

### 2. Configure Script Properties
1. In the Apps Script sidebar, click on **Project Settings** (⚙️).
2. Scroll to **Script Properties** and click **Add script property**.
3. Add the following entry:
   - **Property:** `CALENDAR_NAME`
   - **Value:** `USCCB daily readings`
4. Save properties.

### 3. Set Up Time-Driven Trigger
To run the script automatically in the background:
1. Click the **Triggers** icon (⏰) in the left sidebar.
2. Click **+ Add Trigger**.
3. Configure settings:
   - **Choose which function to run:** `syncUSCCBReadings`
   - **Select event source:** `Time-driven`
   - **Select type of time based trigger:** `Day timer` (e.g., 1:00 AM to 2:00 AM)
4. Click **Save** and grant the required permissions.
