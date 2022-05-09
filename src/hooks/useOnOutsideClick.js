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

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [cb]);

  return { element };
};
