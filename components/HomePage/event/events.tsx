import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define a type for your event data
type Event = {
  id: number;
  title: string;
  description: string | null;
  additional_description: string | null;
  event_date: string;
  image_url: string | null;
};

const EventPage: React.FC = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch("https://alhudaic.ca/api/events.php");
        const data = await res.json();

        if (data && Array.isArray(data) && data.length > 0) {
          // Sort events by date
          const sortedEvents = data.sort(
            (a: Event, b: Event) =>
              new Date(a.event_date).getTime() -
              new Date(b.event_date).getTime()
          );

          // Filter events to find the next upcoming event
          const upcomingEvent = sortedEvents.find(
            (event: Event) => new Date(event.event_date) >= new Date()
          );

          const selectedEvent = upcomingEvent || sortedEvents[0]; // Select the upcoming event, or the most recent one if all are in the past

          // Set the event state
          setEvent(selectedEvent);

          // Set the appropriate status message
          if (upcomingEvent) {
            setStatusMessage("Upcoming Event");
          } else {
            setStatusMessage("Recent Event");
          }
        } else {
          setEvent(null); // No events found
          setStatusMessage("No Events Found");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvent(null); // Error fetching data
        setStatusMessage("Error fetching events");
      }
    };

    fetchEvent();
  }, []);

  // If no event is available, show "No Events Found"
  if (!event) {
    return (
      <div className="container mx-auto py-12 px-4 bg-[#1d8E5A]">
        <h1 className="text-4xl font-bold text-center mb-12 text-gold capitalize underline">
          {statusMessage}
        </h1>
        <p className="text-center text-white capitalize">
          Sorry, we couldnt find any upcoming events at the moment.
        </p>
      </div>
    );
  }

  // Calculate days left for the event
  const eventDate = new Date(event.event_date);
  const today = new Date();
  const timeDifference = eventDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Determine the event status
  let eventStatus = "";
  if (daysLeft > 0) {
    eventStatus = `${daysLeft} days left`;
  } else if (daysLeft === 0) {
    eventStatus = "Today!";
  } else {
    eventStatus = `${Math.abs(daysLeft)} days ago`;
  }

  // Helper function to display text or empty string if null
  const getTextOrEmpty = (text: string | null) => {
    return text ? text : ""; // Return empty string if text is null
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-[#1d8E5A]">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-[1fr_auto] mb-6 gap-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center sm:text-left text-gold capitalize">
          {getTextOrEmpty(event.title)}
        </h1>
        <div className="w-full lg:w-1/4 mx-auto bg-gold h-1 mb-4"></div>{" "}
        {/* Line after the title */}
        {/* Line after the title */}
        <div className="sm:ml-6 grid gap-2 justify-center sm:justify-end">
          <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-center sm:text-left mb-2 text-white capitalize">
            {getTextOrEmpty(statusMessage)}
          </h1>
          <p
            className={`text-white text-center text-lg md:text-xl font-semibold py-2 px-4 shadow-lg shadow-white rounded-lg inline-block ${
              daysLeft > 0
                ? "bg-green-500"
                : daysLeft === 0
                ? "bg-blue-500"
                : "bg-gray-500"
            }`}
          >
            {getTextOrEmpty(eventStatus)}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:items-start gap-6">
        {/* Right side with description and image */}
        <div className="md:w-1/2 grid grid-rows-[1fr_auto] gap-6 h-full">
          <div>
            <p className="text-center md:text-left text-xl md:text-2xl lg:text-3xl text-white mb-6 capitalize">
              {getTextOrEmpty(event.description)}
            </p>
            <p className="text-white leading-relaxed md:text-xl lg:text-2xl font-mono capitalize">
              {getTextOrEmpty(event.additional_description)}
            </p>
          </div>

          <div className="text-white text-lg md:text-xl lg:text-2xl">
            <p>Event Date: {new Date(event.event_date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Event Image */}
        <div className="flex-1 max-w-full mx-auto border-2 border-gray-200 rounded-lg overflow-hidden mt-6 md:mt-0">
          {event.image_url ? (
            <Image
              alt={event.description || "Event Image"}
              width={1200} // A wide width for good scaling
              height={675} // Maintain a nice aspect ratio (16:9)
              src={`https://alhudaic.ca/api/${event.image_url}`}
              className="w-full h-[auto] max-h-[500px] object-contain"
            />
          ) : (
            <div className="w-full h-[auto] max-h-[500px] bg-gray-300 text-center flex items-center justify-center">
              <p className="text-white">Image Not Available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
