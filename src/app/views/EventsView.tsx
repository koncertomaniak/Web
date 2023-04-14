"use client";
import styles from "./Events.module.sass";
import { useEffect, useState } from "react";
import { EventItem } from "@/app/api/models/event";
import { getEvents } from "@/app/api/client";
import EventCard from "@/app/components/cards/EventCard";

const EventsView = () => {
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState<EventItem[] | null>(null);

  const handleRequestEvents = async () => {
    const response = await getEvents(page);
    setEvents(response.data.data);
  };

  useEffect(() => {
    if (events == null) {
      (async () => await handleRequestEvents())();
    }
  }, [events]);

  return (
    <div className={styles.events}>
      {events
        ? events.map((item) => {
            return <EventCard key={item.id} event={item} />;
          })
        : null}
    </div>
  );
};

export default EventsView;
