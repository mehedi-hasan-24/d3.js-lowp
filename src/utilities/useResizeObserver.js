import { useEffect, useState } from "react";

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState({
    height: 500,
    width: 1200,
    margins: {
      top: 50,
      left: 50,
      bottom: 50,
      right: 50,
    },
    textMargin: {
      top: 5,
      left: 5,
    },
  });

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      // console.log(entries);
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;
      const entry = entries[0];
      // entries.forEach((entry) => setDimensions(entry.contentRect));
      setDimensions({
        ...dimensions,
        // height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    });

    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
