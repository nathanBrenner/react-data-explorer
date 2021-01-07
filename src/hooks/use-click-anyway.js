import { useEffect } from 'react';

function clickAwayListener(elementId, callback) {
  return (event) => {
    const outsideClick = !document
      ?.getElementById(elementId)
      ?.contains(event.target);
    if (outsideClick) {
      callback();
    }
  };
}

export function useClickAway(elementId, callback) {
  const listener = clickAwayListener(elementId, callback);

  useEffect(() => {
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, []);
}
