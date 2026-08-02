// ================= CONFIGURATION =================
const FEED_URL = "YOUR_FEED_URL_HERE";
const CALENDAR_NAME = "My Feed Calendar"; 
// =================================================

function syncFeedToCalendar() {
  let targetCalendar;
  const calendars = CalendarApp.getCalendarsByName(CALENDAR_NAME);
  
  if (calendars.length === 0) {
    targetCalendar = CalendarApp.createCalendar(CALENDAR_NAME);
    Logger.log("Created new calendar: " + CALENDAR_NAME);
  } else {
    targetCalendar = calendars[0];
  }

  try {
    const options = {
      "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      "muteHttpExceptions": true
    };

    const response = UrlFetchApp.fetch(FEED_URL, options);
    
    if (response.getResponseCode() === 200) {
      const xmlText = response.getContentText();
      const document = XmlService.parse(xmlText);
      const root = document.getRootElement();
      const channel = root.getChild('channel');
      const items = channel.getChildren('item');

      items.forEach(function(item) {
        const title = item.getChildText('title');
        let description = item.getChildText('description');
        
        // Check if event info is available; if not, stop/skip this item
        if (!title || !description) {
          Logger.log("Skipping item: missing title or description information.");
          return;
        }

        // Clean HTML formatting tags from description
        description = description
          .replace(/<br\s*[\/]?>/gi, "\n")
          .replace(/<[^>]*>?/gm, '')
          .trim();

        const pubDateStr = item.getChildText('pubDate');
        let dateObj = new Date();
        if (pubDateStr) {
          dateObj = new Date(pubDateStr);
        }

        // Set timed event range: Starts at 6:00 AM, Ends at 7:00 AM on that day
        const startTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 6, 0, 0);
        const endTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 7, 0, 0);

        // Search for existing events on that entire day (midnight to midnight)
        const dayStart = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0);
        const dayEnd = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59);
        
        const existingEvents = targetCalendar.getEvents(dayStart, dayEnd);

        // IF event for that day has been created, DO NOTHING. ELSE create the event.
        if (existingEvents.length > 0) {
          Logger.log("Event already exists for " + startTime.toDateString() + ". Skipping creation.");
        } else {
          // Create the new all-day event
          const newEvent = targetCalendar.createAllDayEvent(title, dateObj, { description: description });
          
          // Add phone popup notification 60 minutes before midnight
          newEvent.addPopupReminder(60); 

          Logger.log("Added Feed Entry (" + startTime.toLocaleString() + "): " + title);
        }
      });
    } else {
      Logger.log("Feed HTTP Error: " + response.getResponseCode());
    }
  } catch (err) {
    Logger.log("Error processing RSS: " + err.toString());
  }
}
