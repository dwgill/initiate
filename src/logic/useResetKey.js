import { useState, useEffect } from "react";

/**
 * This is a function that handles the logic of generating a keyvalue that
 * immediately updates after mount.
 * @param {[number | string, number | string]} keys
 * @param {number} timeout
 * @returns {number | string}
 */
function useResetKey([firstKeyVal, secondKeyVal], timeout = 10) {
  const [keyState, setKeyState] = useState(firstKeyVal);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setKeyState(secondKeyVal);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [secondKeyVal, timeout]);

  return keyState;
}

export default useResetKey;