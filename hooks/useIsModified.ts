import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useIsModified<T>(value: T) {
  const [isModified, setIsModified] = useState(false);
  const initialValue = useRef<T>(value);

  useEffect(() => {
    if (!isEqual(initialValue.current, value)) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [value]);

  const clearIsModified = () => {
    initialValue.current = value;
    setIsModified(false);
  };

  return { isModified, clearIsModified };
}
