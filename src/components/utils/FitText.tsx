import binarySearch from "@/lib/binarySearch";
import React, {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  FC,
} from "react";

// mode (single|multi) force singleline or multiline. default multi
// min (Number) minimum font size. default 0
// max (Number) maximum font size. default 300

interface Props extends HTMLAttributes<HTMLDivElement> {
  mode?: "single" | "multi";
  min?: number; // inclusive
  max?: number; // inclusive
}

const FitText: FC<PropsWithChildren<Props>> = ({
  children,
  mode = "multi",
  min = 0,
  max = 300,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOverFlow = useCallback(() => {
    const el = ref.current;
    if (!!el) {
      /* 
      https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
      https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
      **/
      return (
        el!.scrollHeight > el!.clientHeight || el!.scrollWidth > el!.clientWidth
      );
    }
    return null;
  }, []);
  const setFontSize = useCallback(() => {
    const el = ref.current!;

    const originVisibility = el.style.visibility;

    el.style.visibility = "hidden";
    const fontSize = binarySearch(min, max + 1, (mid) => {
      el.style.fontSize = `${mid}px`;
      return !isOverFlow();
    });
    el.style.fontSize = `${fontSize}px`;
    el.style.visibility = originVisibility;
  }, [isOverFlow, min, max]);

  useEffect(() => {
    const el = ref.current!;

    setFontSize();
    // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
    const observer = new ResizeObserver(setFontSize);
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [children, mode, setFontSize]);

  return (
    <div
      ref={ref}
      style={{
        whiteSpace: mode === "single" ? "nowrap" : "normal",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export { FitText };
