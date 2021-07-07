import { useEffect } from "react";

const useOutside = (ref, callback) => {
  useEffect(() => {
    if (typeof callback !== "function") return;
    function outside(event) {
      if (ref?.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [ref, callback]);
};

export default useOutside;
