// ================= CONFIGURATION =================
const USCCB_RSS_URL = "https://bible.usccb.org/readings.rss";
const CALENDAR_NAME = "USCCB daily readings"; 
// =================================================

function syncUSCCBReadings() {
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

    const response = UrlFetchApp.fetch(USCCB_RSS_URL, options);
    
    if (response.getResponseCode() === 200) {
      const xmlText = response.getContentText();
      const document = XmlService.parse(xmlText);
      const root = document.getRootElement();
      const channel = root.getChild('channel');
      const items = channel.getChildren('item');

      items.forEach(function(item) {
        const title = item.getChildText('title') || "Daily Mass Readings";
        let description = item.getChildText('description') || "";
        
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

        // 3. Delete any duplicates or existing USCCB reading events on that day
        existingEvents.forEach(function(existingEvent) {
          if (existingEvent.getTitle() === title || existingEvent.getTitle().includes("Reading")) {
            Logger.log("Removing duplicate/existing event: " + existingEvent.getTitle());
            existingEvent.deleteEvent();
          }
        });

        // Create the new timed event
        const newEvent = targetCalendar.createEvent(title, startTime, endTime, { description: description });
        
        // Add phone popup notification 60 minutes before 6:00 AM (at 7:00 AM notification setting)
        newEvent.addPopupReminder(60); 

        Logger.log("Added USCCB Reading (" + startTime.toLocaleString() + "): " + title);
      });
    } else {
      Logger.log("USCCB Feed HTTP Error: " + response.getResponseCode());
    }
  } catch (err) {
    Logger.log("Error processing USCCB RSS: " + err.toString());
  }
}
