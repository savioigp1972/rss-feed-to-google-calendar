# 📡 Generic RSS / Atom Feed to Google Calendar Sync 🗓️✨

An automated, flexible **Google Apps Script** ⚙️ that parses any RSS or Atom feed (configured via **Script Properties** ⚙️) and automatically syncs feed entries as timed events to a dedicated Google Calendar! 📅

---

## 🌟 Key Features 🚀

* ⚙️ **Dynamic Configuration:** Uses `PropertiesService` so you can set custom calendar names and feed URLs without modifying the code!
* 🌐 **User-Agent Header Support:** Sends proper browser headers to prevent RSS servers from blocking request calls.
* 🧹 **Smart Duplicate Cleanup:** Automatically detects and deletes duplicate existing events on target dates before re-syncing!
* ⏰ **Fixed Event Schedule:** Automatically creates 1-hour events starting at **6:00 AM** on publication days 🌅.
* 🔔 **Mobile Reminders:** Attaches a **60-minute popup notification** 📲 to every created event.
* 🧼 **HTML Formatting Cleanup:** Strips HTML tags and `<br>` elements from descriptions so calendar notes remain clean and readable 📖!

---

## 🛠️ How Script Properties Work ⚙️

You can configure script behavior directly inside Google Apps Script settings without changing code:

| Property Key 🔑 | Default Fallback 📌 | Description 📝 |
| :--- | :--- | :--- |
| `CALENDAR_NAME` | `"My RSS Feed Calendar"` | Target Google Calendar name 📅 |
| `FEED_URL` | `"https://bible.usccb.org/readings.rss"` | RSS / Atom feed URL to sync 📡 |

---

## 🚀 Setup Guide 🛠️

### Step 1: Open Google Apps Script 💻
1. Go to **[script.google.com](https://script.google.com)** 🌐.
2. Create or open your project and paste the code from `Code.gs`.

### Step 2: Configure Script Properties ⚙️
1. Click the **Project Settings** icon ⚙️ *(gear icon on the left sidebar)*.
2. Scroll down to **Script Properties** 📝.
3. Click **Add script property**:
   * **Property:** `CALENDAR_NAME` | **Value:** `USCCB daily readings` *(or your preferred calendar name)*
   * **Property:** `FEED_URL` | **Value:** `https://bible.usccb.org/readings.rss` *(or any RSS feed URL)*
4. Click **Save script properties** 💾.

### Step 3: Run & Authorize 🔑
1. Switch back to the **Editor** (`< >`).
2. Select `syncFeedToCalendar` from the top execution dropdown ▶️.
3. Click **Run** 🟢 and grant Calendar and External Link permissions when prompted 🛡️.

---

## 📸 Execution Log Preview 📊

![RSS Execution Log](execution-log.png)

---

## ⏰ Automate Daily Sync 🤖

1. Click the **Triggers icon** ⏰ *(alarm clock on the left toolbar)*.
2. Click **+ Add Trigger** (bottom right) 🔘.
3. Configure settings:
   * **Function to run:** `syncFeedToCalendar` 📡
   * **Event source:** `Time-driven` ⏳
   * **Type of trigger:** `Day timer` ☀️
   * **Time of day:** Choose an early morning hour (e.g., `5am to 6am`) ☕
4. Click **Save** 💾!

---

## 📜 License 📄

Distributed under the **MIT License** ⚖️. Free for open-source and personal automation! 🤝🎉
