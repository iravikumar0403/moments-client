import { useEffect } from "react";

export const useDocumentTitle = (title = "Moments") => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
