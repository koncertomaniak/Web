"use client";
import styles from "./Events.module.sass";
import { useEffect, useState } from "react";
import { getEvents, getSearchEvents } from "@/app/api/client";
import EventCard from "@/app/components/cards/EventCard";
import ErrorMessageDialog from "@/app/components/dialogs/ErrorMessageDialog";
import { useRecoilValue } from "recoil";
import { searchBoxInput } from "@/app/states";
import { isEmpty } from "lodash";
import { EventItem } from "@/app/api/models/event";

const EventsView = () => {
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState<EventItem[]>();
  const term = useRecoilValue(searchBoxInput);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const handleRequestEvents = async (term: string) => {
    const response = isEmpty(term)
      ? await getEvents(page)
      : await getSearchEvents(term, page);

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
    await handleRequestEvents(term);
  };

  useEffect(() => {
    (async () => await handleRequestEvents(term))();
  }, [term]);

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
