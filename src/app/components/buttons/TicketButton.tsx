import React from "react";
import { Ticket } from "@/app/api/models/ticket";
import styles from "./TicketButton.module.sass";

interface TicketProps {
  item: Ticket;
}

const TicketButton: React.FC<TicketProps> = ({ item }) => {
  const onButtonClicked = () => {
    window.open(item.url, "blank");
  };

  return (
    <div className={styles.ticketButton} onClick={onButtonClicked}>
      <img className={styles.image} src={item.imageUrl} />
      <div className={styles.label}>Kup Bilety</div>
    </div>
  );
};

export default TicketButton;
