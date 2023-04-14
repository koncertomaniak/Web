import { EventItem } from "@/app/api/models/event";
import React from "react";
import styles from "./EventCard.module.sass";
import Button from "@/app/components/buttons/Button";

interface EventCardProps {
  event: EventItem;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const MAX_DESCRIPTION_LENGTH = 300;

  const shortDescription = (description: string) =>
    description.length <= MAX_DESCRIPTION_LENGTH
      ? description
      : description.substring(
          0,
          description.lastIndexOf(" ", MAX_DESCRIPTION_LENGTH)
        ) + "...";

  return (
    <div className={styles.card}>
      <header>{event.name}</header>
      <section>{shortDescription(event.description)}</section>
      <div className={styles.options}>
        <Button
          label={"Zobacz więcej"}
          clickHandler={() => console.log("dupa xd")}
        />
      </div>
    </div>
  );
};

export default EventCard;
