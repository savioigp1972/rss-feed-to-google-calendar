# RSS Feed to Google Calendar Sync

A simple Google Apps Script that automatically syncs any RSS feed (like USCCB daily readings, blogs, or news) to a custom Google Calendar with daily phone reminders.

---

## 🚀 Quick Setup Guide

### Step 1: Create the Script
1. Go to [script.google.com](https://script.google.com) and click **New Project**.
2. Delete any code in the editor, paste the code from `Code.gs`, and click **Save** (💾).

---

### Step 2: Add Your Feed Details
1. Click the **Project Settings** icon (⚙️) on the left sidebar.
2. Scroll down to **Script Properties** and click **Add script property**.
3. Add these 2 settings:

| Property | Value |
| :--- | :--- |
| `CALENDAR_NAME` | `USCCB daily readings` *(or whatever name you want)* |
| `FEED_URL` | `https://bible.usccb.org/readings.rss` *(or your RSS link)* |

4. Click **Save script properties**.

---

### Step 3: Turn On Automatic Syncing
1. Click the **Triggers** icon (⏰) on the left sidebar.
2. Click **+ Add Trigger** (bottom right).
3. Set the options to:
   * **Which function to run:** `syncFeedToCalendar`
   * **Event source:** `Time-driven`
   * **Type of time trigger:** `Day timer` (e.g., 1am to 2am)
4. Click **Save** and grant permissions if prompted.

---

## ✨ Features
* 📅 **Automatic Sync:** Keeps your Google Calendar updated every day.
* 🧹 **Clean Text:** Removes messy HTML tags from post descriptions.
* 🚫 **No Duplicates:** Automatically removes duplicate entries on the same day.
* 🔔 **Mobile Notifications:** Sends a popup reminder directly to your phone.
---

## 🌐 Looking for RSS Feeds?
Browse our comprehensive [Categorized RSS Feeds Directory (FEEDS.md)](FEEDS.md) for ready-to-use feed URLs spanning Catholic readings, Indian & Global news, Football, Tech, and more!
