import { useCallback, KeyboardEvent } from "react";

function makeShortcutHook(eventPredicate: (event: KeyboardEvent) => boolean) {
  function useHook(callback: () => boolean) {
    function onKeyDown(event: KeyboardEvent) {
      if (eventPredicate(event)) {
        callback();
        return true;
      }

      return false;
    }

    return useCallback(onKeyDown, [callback]);
  }

  return useHook;
}


export function copyCombatantPredicate(event: KeyboardEvent): boolean {
  return event.shiftKey && event.ctrlKey && event.key === "Enter";
}

export function newCombatantPredicate(event: KeyboardEvent): boolean {
  return !event.shiftKey && event.ctrlKey && event.key === "Enter";
}

export function progressInitiativePredicate(event: KeyboardEvent): boolean {
  return !event.shiftKey && event.ctrlKey && event.key === " ";
}
