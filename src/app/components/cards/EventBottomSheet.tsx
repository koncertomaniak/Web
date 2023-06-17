import styles from "./EventBottomSheet.module.sass";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentEventCard, showMoreCardState } from "@/app/states";
import { useEffect, useState } from "react";
import { Ticket } from "@/app/api/models/ticket";
import { getEventTickets } from "@/app/api/client";
import TicketButton from "@/app/components/buttons/TicketButton";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import useTriggerElement from "@/app/hooks/useTriggerElement";
import ErrorMessageDialog from "@/app/components/dialogs/ErrorMessageDialog";

const EventBottomSheet = () => {
  const [showCard, setShowCard] = useRecoilState(showMoreCardState);
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const currentEvent = useRecoilValue(currentEventCard);
  const [bottomSheet, bottomSheetBehaviour] = useSpring(() => ({
    y: window.innerHeight,
    height: "40%",
  }));
  const [backdrop, backdropBehaviour] = useSpring(() => ({
    opacity: "1",
  }));
  const containerId = "bottom-sheet-container";
  const backgroundClicked = useTriggerElement(containerId);

  const lineDrag = useDrag((state) => {
    const y = state.xy[1];

    if (y >= 0 && y <= window.innerHeight)
      bottomSheetBehaviour.set({
        height: `${y}px`,
      });
    if (y <= window.innerHeight * 0.4) {
      onClose();
    }
  });

  const updateEventTickets = async () => {
    const response = await getEventTickets(currentEvent?.id!);

    if (typeof response !== "string") {
      if (response.data.statusCode === 200) {
        setNetworkError(response.data.errorMessage);
        return;
      }

      setTickets(response.data.data);
    }

    setNetworkError(response as string);
  };

  const refreshHandler = async () => {
    setNetworkError(null);
    await updateEventTickets();
  };

  useEffect(() => {
    if (backgroundClicked) onClose();
  }, [backgroundClicked]);

  useEffect(() => {
    if (currentEvent) (async () => updateEventTickets())();
    if (showCard) {
      backdropBehaviour.start({ opacity: "1" });
      bottomSheetBehaviour.start({ y: 0 });
    }
  }, [showCard]);

  const onClose = () => {
    backdropBehaviour.start({ opacity: "0" });
    bottomSheetBehaviour.start({
      y: window.innerHeight,
      onRest: () => {
        setShowCard(false);
      },
    });
  };

  return showCard ? (
    <animated.div
      id={containerId}
      style={backdrop}
      className={styles.eventBottomSheetContainer}
    >
      <animated.div
        id="event-details-bottom-sheet"
        style={bottomSheet}
        className={styles.eventBottomSheet}
      >
        <div className={styles.line} {...lineDrag()}></div>
        <div className={styles.content}>
          {networkError ? (
            <ErrorMessageDialog
              errorCode={networkError}
              refreshHandler={refreshHandler}
            />
          ) : (
            <>
              {/*<img src={currentEvent?.imageUrl!} className={styles.image} alt={""} loading="lazy" />*/}
              {/*<div className={styles.description}>*/}
              {/*  {currentEvent?.description}*/}
              {/*</div>*/}
              <div className={styles.tickets}>
                {tickets?.map((item, index) => {
                  return <TicketButton key={index} item={item} />;
                })}
              </div>
            </>
          )}
        </div>
      </animated.div>
    </animated.div>
  ) : null;
};

export default EventBottomSheet;
