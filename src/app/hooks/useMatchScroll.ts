import { useEffect, useState } from "react";

const useMatchScroll = () => {
  const [heightMatches, setHeightMatches] = useState(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const clientHeight = document.scrollingElement?.clientHeight;
      const scrollHeight = document.scrollingElement?.scrollHeight;
      const scrollTop = document.scrollingElement?.scrollTop;

      setHeightMatches(
        clientHeight! === scrollHeight! - Math.round(scrollTop!)
      );
    };

    document.addEventListener("scroll", handleScroll);

    return () => removeEventListener("scroll", handleScroll);
  });

  return heightMatches;
};

export default useMatchScroll;
