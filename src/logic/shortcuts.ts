import { useCallback, KeyboardEvent } from 'react';

function makeShortcutHook(eventPredicate: (event: KeyboardEvent) => boolean) {
  function useHook(callback: () => void) {
    function onKeyDown(event: KeyboardEvent) {
      if (eventPredicate(event)) {
        callback();
      }
    }

    return useCallback(onKeyDown, [callback]);
  }

  return useHook;
}

export const useCopyCombatantShortcut = makeShortcutHook(event => {
  return event.shiftKey && event.ctrlKey && event.key === "Enter";
});

export const useNewCombatantShortcut = makeShortcutHook(event => {
  return event.shiftKey && !event.ctrlKey && event.key === "Enter";
});