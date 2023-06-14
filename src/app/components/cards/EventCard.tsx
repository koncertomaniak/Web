import { EventItem } from "@/app/api/models/event";
import React from "react";
import styles from "./EventCard.module.sass";
import Button from "@/app/components/buttons/Button";
import { useSetRecoilState } from "recoil";
import { currentEventCard, showMoreCardState } from "@/app/states";

interface EventCardProps {
  event: EventItem;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const setShowCard = useSetRecoilState(showMoreCardState);
  const setEventCard = useSetRecoilState(currentEventCard);

  const MAX_DESCRIPTION_LENGTH = 300;

  const shortDescription = (description: string) =>
    description.length <= MAX_DESCRIPTION_LENGTH
      ? description
      : description.substring(
          0,
          description.lastIndexOf(" ", MAX_DESCRIPTION_LENGTH)
        ) + "...";

  const handleShowEventBottomCard = () => {
    setEventCard(event);
    setShowCard(true);
  };

  return (
    <div className={styles.card}>
      <header>{event.name}</header>
      <section>{shortDescription(event.description)}</section>
      <div className={styles.options}>
        <Button
          label={"Zobacz więcej"}
          clickHandler={handleShowEventBottomCard}
        />
      </div>
    </div>
  );
};

export default EventCard;
