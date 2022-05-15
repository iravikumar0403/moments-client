import { useEffect, useRef } from "react";

export const useAutoResize = (input, initialHeight = "0px") => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = initialHeight || "auto";
      ref.current.style.height = ref.current?.scrollHeight + 2 + "px";
    }
  }, [input, initialHeight]);

  return ref;
};
