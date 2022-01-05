export default function Calendar() {
    const calendarSrc =
        'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FToronto&showTitle=0&showNav=1&showDate=1&showPrint=1&showTabs=1&title=Hacker%20Calendar&src=NGlrMWJqdmw1aGQ5OTRudXY1OG9rODVzbmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D81B60';

    return (
            <iframe
                className="calendar-frame"
                src={calendarSrc}
                width="100%"
                height="100%"
                scrolling="no"
            ></iframe>
    );
}
