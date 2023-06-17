"use client";
import styles from "./Events.module.sass";
import { useEffect, useState } from "react";
import { EventItem } from "@/app/api/models/event";
import { getEvents } from "@/app/api/client";
import EventCard from "@/app/components/cards/EventCard";
import EventBottomSheet from "@/app/components/cards/EventBottomSheet";
import { type } from "os";
import ErrorMessageDialog from "@/app/components/dialogs/ErrorMessageDialog";

const EventsView = () => {
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const handleRequestEvents = async () => {
    const response = await getEvents(page);

    if (typeof response !== "string") {
      if (response.data.statusCode !== 200) {
        setNetworkError(response.data.errorMessage);
        return;
      }

      setEvents(response.data.data);
      return;
    }

    setNetworkError(response as string);
  };

  const refreshHandler = async () => {
    setNetworkError(null);
    await handleRequestEvents();
  };

  useEffect(() => {
    if (events == null) {
      (async () => await handleRequestEvents())();
    }
  }, [events]);

  return networkError == null ? (
    <div className={styles.events}>
      {events
        ? events.map((item) => {
            return <EventCard key={item.id} event={item} />;
          })
        : null}
    </div>
  ) : (
    <ErrorMessageDialog
      errorCode={networkError!}
      refreshHandler={refreshHandler}
    />
  );
};

export default EventsView;
