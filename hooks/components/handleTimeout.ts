export const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    const debouncedFunction = (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };

    debouncedFunction.cancel = () => {
      clearTimeout(timeoutId);
    };

    return debouncedFunction;
  };