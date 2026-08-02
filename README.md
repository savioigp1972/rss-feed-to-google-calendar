# 📡 RSS Feed to Google Calendar Sync 🗓️✨

> **A lightweight Google Apps Script to automatically sync custom RSS feeds (news, sports, hobbies, Catholic devotions, life hacks, and more) into Google Calendar.**

An automated, highly flexible **Google Apps Script** ⚙️ that parses any RSS or Atom feed (configured easily via **Script Properties**) and automatically posts feed entries as timed events into a dedicated Google Calendar! 📅

---

## 🌟 Key Features 🚀

* 📡 **Universal RSS/Atom Support:** Syncs news, sports feeds, daily devotions, tech updates, blogs, or custom feeds directly to your calendar!
* ⚙️ **Dynamic Configuration:** Uses `PropertiesService` so you can set custom calendar names and feed URLs without editing code.
* 🌐 **User-Agent Header Support:** Sends proper browser headers to prevent external servers from blocking feed requests.
* 🛡️ **Smart Anti-Duplicate Protection:** Checks existing entries before creating new ones to keep your calendar neat and uncluttered.
* ⏰ **Hands-Free Automation:** Runs on autopilot using Google Apps Script time-driven triggers.
* 🧼 **Clean Formatting:** Automatically strips raw HTML tags and formatting from feed descriptions so event notes stay easy to read.

---

## 📸 Execution Log Preview 📊

Here is the script in action, verifying feed entries date-by-date and skipping duplicates:

![RSS Sync Execution Log](execution-logrss.png)

> **Note:** The script verifies existing calendar entries first to prevent double-booking or cluttered schedules! 🛡️✨

---

## 🛠️ Step-by-Step Setup Guide 🚀

Follow these straightforward steps to get your automated RSS feed sync running in under 5 minutes:

### Step 1: Open Google Apps Script 💻
1. Go to **[script.google.com](https://script.google.com)** and log in with your Google Account.
2. Click **+ New project** in the top left corner.
3. Rename the project at the top from *Untitled project* to **RSS Feed Calendar Sync**.

### Step 2: Paste the Script Code 📋
1. Delete any existing code inside the `Code.gs` editor window.
2. Copy the script code from this repository and paste it into `Code.gs`.
3. Click the **Save icon** 💾 (or press `Ctrl + S` / `Cmd + S`).

### Step 3: Configure Script Properties ⚙️
1. Click the **Project Settings icon** ⚙️ *(gear icon on the left navigation bar)*.
2. Scroll down to the **Script Properties** section.
3. Click **Add script property** and enter your desired feed info:
   * **Property:** `CALENDAR_NAME` | **Value:** `My RSS Feed Calendar` *(or your custom calendar name)*
   * **Property:** `FEED_URL` | **Value:** `https://your-rss-feed-url.com/feed.xml` *(paste your RSS/Atom URL here)*
4. Click **Save script properties** 💾.

> 💡 **Need sample feeds to test?** Check out our [`FEEDS.md`](FEEDS.md) file for a curated list of ready-to-use RSS URLs across news, tech, devotions, sports, and life hacks!

### Step 4: First Test Run & Authorize 🔑
1. Click the **Editor icon** `< >` on the left bar to return to your code.
2. In the top toolbar dropdown menu next to **Debug**, select `syncFeedToCalendar` (or `syncUSCCBReadings`).
3. Click **Run** 🟢.
4. An **"Authorization required"** prompt will appear:
   * Click **Review permissions**.
   * Select your Google Account.
   * Click **Advanced** $\rightarrow$ click **Go to RSS Feed Calendar Sync (unsafe)**.
   * Click **Allow** to grant access to Google Calendar and UrlFetchApp.
5. Check the **Execution log** at the bottom to verify successful syncing!

### Step 5: Automate Daily Execution ⏰
To have Google sync your RSS feed automatically every morning:
1. Click the **Triggers icon** ⏰ *(alarm clock on the left sidebar)*.
2. Click **+ Add Trigger** (blue button in the bottom right corner).
3. Set the configuration:
   * **Choose which function to run:** `syncFeedToCalendar` *(or your main sync function)*
   * **Select event source:** `Time-driven`
   * **Select type of time based trigger:** `Day timer`
   * **Select time of day:** Choose your preferred daily time (e.g., `5am to 6am`) ☕
4. Click **Save** 💾!

---

## 📂 Ready-to-Use Feed Directory (`FEEDS.md`) 📜

Check out the included **[`FEEDS.md`](FEEDS.md)** file in this repository for a collection of popular RSS feeds you can plug directly into your script settings, including:
* ✝️ Daily Mass Readings & Devotions
* 📰 World & Local News
* 💻 Tech & Programming Updates
* ⚽ Sports Schedules & News
* 💡 Life Hacks & Productivity

---

## 📜 License 📄

Distributed under the **MIT License** ⚖️. Free for personal, open-source, or community use! 🤝🎉
