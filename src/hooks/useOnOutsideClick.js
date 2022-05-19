import { useRef, useEffect } from "react";

export const useOnOutsideClick = (cb) => {
  const element = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (element.current && !element.current?.contains(event.target)) {
        cb(event);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, [cb]);

  return { element };
};
