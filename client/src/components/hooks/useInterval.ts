import { useEffect, useRef } from "react";

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const intervalId = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(intervalId);
  }, [delay]);
}
