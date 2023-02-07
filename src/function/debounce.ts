interface DebounceProps {
  f: () => void;
  ms: number;
}

export function debounce({ f, ms }: DebounceProps) {
  let timeout: any;

  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      f();
    }, ms);
  };
}
