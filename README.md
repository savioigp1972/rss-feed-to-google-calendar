# 📖 USCCB Daily Readings RSS to Google Calendar 🗓️✨

An automated **Google Apps Script** ⚙️ that fetches daily Catholic Mass readings from the official **USCCB RSS feed** (`https://bible.usccb.org/readings.rss`) ✝️ and syncs them directly into a dedicated Google Calendar! 📅

---

## 🌟 Features 🚀

* 📡 **Live RSS Sync:** Parses the official USCCB feed for daily Mass readings.
* 📆 **Dedicated Calendar:** Automatically creates and manages a calendar named `"USCCB daily readings"`.
* 🛡️ **Anti-Duplicate Protection:** Checks existing entries before creating new ones to avoid calendar clutter.
* ⏰ **Automated Daily Sync:** Runs hands-free every morning using Google Apps Script triggers.

---

## 📸 Execution Log Preview 📊

Here is the script verifying daily readings and skipping duplicates:

![USCCB Daily Readings Execution Log](execution-logrss.png)

> **Note:** The script checks daily calendar entries first and skips event creation if the entry already exists! 🛡️✨

---

## 🛠️ Detailed Step-by-Step Setup Guide 🚀

Follow these straightforward steps to set up the script in under 5 minutes:

### Step 1: Open Google Apps Script 💻
1. Go to **[script.google.com](https://script.google.com)** and log in with your Google Account.
2. Click **+ New project** in the top left corner.
3. Rename the project at the top from *Untitled project* to **USCCB DAILY READINGS**.

### Step 2: Paste the Code 📋
1. Delete any code currently in the `Code.gs` editor window.
2. Copy the script code from this repository and paste it into `Code.gs`.
3. Click the **Save icon** 💾 (or press `Ctrl + S` / `Cmd + S`).

### Step 3: Add Script Properties ⚙️ *(Optional / Recommended)*
1. Click the **Project Settings icon** ⚙️ *(the gear icon on the left navigation bar)*.
2. Scroll down to the **Script Properties** section.
3. Click **Add script property** and enter:
   * **Property:** `CALENDAR_NAME` | **Value:** `USCCB daily readings`
   * **Property:** `FEED_URL` | **Value:** `https://bible.usccb.org/readings.rss`
4. Click **Save script properties** 💾.

### Step 4: First Test Run & Grant Authorizations 🔑
1. Click the **Editor icon** `< >` on the left navigation bar to return to your code.
2. In the top toolbar dropdown menu next to **Debug**, select your main function (`syncUSCCBReadings` or `syncFeedToCalendar`).
3. Click **Run** 🟢.
4. An **"Authorization required"** window will pop up:
   * Click **Review permissions**.
   * Choose your Google Account.
   * Click **Advanced** $\rightarrow$ click **Go to USCCB DAILY READINGS (unsafe)**.
   * Click **Allow** to grant access to Google Calendar and external URLs.
5. Check the **Execution log** at the bottom to confirm successful execution!

### Step 5: Automate Daily Execution ⏰
To have Google sync readings automatically every morning:
1. Click the **Triggers icon** ⏰ *(alarm clock on the left sidebar)*.
2. Click **+ Add Trigger** (blue button in the bottom right corner).
3. Configure the trigger options:
   * **Choose which function to run:** `syncUSCCBReadings` *(or `syncFeedToCalendar`)*
   * **Select event source:** `Time-driven`
   * **Select type of time based trigger:** `Day timer`
   * **Select time of day:** `5am to 6am` *(or your preferred morning time)*
4. Click **Save** 💾!

---

## 📜 License 📄

Distributed under the **MIT License** ⚖️. Free for personal or community use! 🤝🎉
