import { useEffect, useState } from "react";

export const useInfiniteScroll = (callback) => {
  const [loaderRef, setLoaderRef] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        callback();
      },
      { threshold: 0.5 }
    );

    loaderRef && observer.observe(loaderRef);

    return () => {
      if (loaderRef) observer.unobserve(loaderRef);
    };
  }, [callback, loaderRef]);

  return { setLoaderRef };
};
