import { useEffect, useState } from "react";

const useTriggerElement = (elementId: string) => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const onAnyElementClicked = (event: MouseEvent) => {
      // @ts-ignore
      if (elementId === event.target.id) {
        setTriggered(true);
        return;
      }

      setTriggered(false);
    };

    document.addEventListener("click", onAnyElementClicked);

    return () => removeEventListener("click", onAnyElementClicked);
  }, [triggered, elementId]);

  return triggered;
};

export default useTriggerElement;
