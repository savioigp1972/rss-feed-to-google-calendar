/**
 * Generic RSS/Atom Feed to Google Calendar Sync
 * Configured using Script Properties in Google Apps Script (Project Settings ⚙️)
 */

function syncFeedToCalendar() {
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // Read configuration from Script Properties (with defaults)
  const CALENDAR_NAME = scriptProperties.getProperty('CALENDAR_NAME') || "My RSS Feed Calendar";
  const FEED_URL = scriptProperties.getProperty('FEED_URL') || "https://bible.usccb.org/readings.rss";

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
      
      if (!channel) {
        Logger.log("Could not find <channel> tag in XML feed.");
        return;
      }

      const items = channel.getChildren('item');

      items.forEach(function(item) {
        const title = item.getChildText('title') || "New Feed Entry";
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

        // Set timed event range: Starts at 6:00 AM on the publication day
        const startTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 6, 0, 0);
        const endTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 7, 0, 0);

        // Search range for existing events on that day (midnight to midnight)
        const dayStart = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0);
        const dayEnd = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59);
        
        const existingEvents = targetCalendar.getEvents(dayStart, dayEnd);

        // Remove duplicate/existing events for that entry
        existingEvents.forEach(function(existingEvent) {
          if (existingEvent.getTitle() === title) {
            Logger.log("Removing duplicate event: " + existingEvent.getTitle());
            existingEvent.deleteEvent();
          }
        });

        // Create new calendar event
        const newEvent = targetCalendar.createEvent(title, startTime, endTime, { description: description });
        
        // Add mobile popup reminder (60 min before event start = 7:00 AM notification)
        newEvent.addPopupReminder(60); 

        Logger.log("Synced Event (" + startTime.toLocaleDateString() + "): " + title);
      });
    } else {
      Logger.log("Feed HTTP Error Code: " + response.getResponseCode());
    }
  } catch (err) {
    Logger.log("Error processing feed: " + err.toString());
  }
}
