"use client";
import styles from "./Events.module.sass";
import { useEffect, useState } from "react";
import { getEvents, getSearchEvents } from "@/app/api/client";
import EventCard from "@/app/components/cards/EventCard";
import ErrorMessageDialog from "@/app/components/dialogs/ErrorMessageDialog";
import { useRecoilValue } from "recoil";
import { searchBoxInput } from "@/app/states";
import { isEmpty, isNull } from "lodash";
import { EventItem } from "@/app/api/models/event";
import useScrollEnd from "@/app/hooks/useScrollEnd";

const EventsView = () => {
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const term = useRecoilValue(searchBoxInput);
  const scrollEnd = useScrollEnd();

  const handleRequestEvents = async (input: string) => {
    const response = isEmpty(input)
      ? await getEvents(page)
      : await getSearchEvents(term, page);

    if (typeof response !== "string") {
      if (response.data.statusCode !== 200) {
        setNetworkError(response.data.errorMessage);
        return;
      }

      setEvents(
        isNull(events) ? response.data.data : events!.concat(response.data.data)
      );
      return;
    }
    setNetworkError(response as string);
  };

  const refreshHandler = async () => {
    setNetworkError(null);
    setEvents(null);
    await handleRequestEvents(term);
  };

  const handleScroll = async () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (scrollEnd) handleScroll();
  }, [scrollEnd]);

  useEffect(() => {
    if (events != null && !isEmpty(term)) {
      setEvents(null);
      setPage(0);
      return;
    }
    (async () => await handleRequestEvents(term))();
  }, [term, page]);

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
