import { useBrowserLayoutEffect } from "components/hooks";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { initialScrollData } from "./constants";
import { ScrollDataContext, ScrollPageContext } from "./stores";
import { ScrollData } from "./types";
import { environment } from "./utils";

interface ScrollContainerProps {
  snap?: "none" | "proximity" | "mandatory";
  children: ReactNode | ReactNode[];
  scrollParent?: Window | HTMLElement;
  onScroll?: (event: ScrollData) => void;
}

const _window: (Window & typeof globalThis) | undefined =
  typeof window !== "undefined" ? window : undefined;

const ScrollContainer: FC<ScrollContainerProps> = (props) => {
  const { snap = "none", children, scrollParent: _scrollParent } = props;
  const scrollParent = _scrollParent || _window;

  const [scrollData, setScrollData] = useState<ScrollData>(initialScrollData);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>();

  const scrollEvent = useCallback(() => {
    if (snap !== "none" && scrollTimer.current)
      clearTimeout(scrollTimer.current);

    const currentY: number =
      scrollParent === window
        ? window.pageYOffset
        : (scrollParent as HTMLElement).scrollTop;
    const viewportHeight: number =
      scrollParent === window
        ? environment.height
        : (scrollParent as HTMLElement).clientHeight;
    const totalPage: number = Array.isArray(children) ? children?.length : 1;
    const totalHeight: number = totalPage * (viewportHeight - 1);
    const totalProgress: number = currentY / totalHeight;
    const realPage: number = currentY / viewportHeight;
    const currentPage: number = Math.floor(realPage);
    const currentProgress: number = realPage - currentPage;

    const data = {
      currentY,
      viewportHeight,
      totalPage,
      totalHeight,
      totalProgress,
      realPage,
      currentPage,
      currentProgress,
    } as ScrollData;

    setScrollData((scrollData) => ({ ...scrollData, ...data }));

    props?.onScroll(data);

    if (snap !== "none") {
      scrollTimer.current = setTimeout(() => {
        const newCurrentPage = Math.round(realPage);
        let newCurrentY = currentY;

        if (snap === "mandatory" || Math.abs(newCurrentPage - realPage) < 0.3)
          newCurrentY = newCurrentPage * viewportHeight;

        if (newCurrentY !== currentY)
          window.scrollTo({
            top: newCurrentY,
            behavior: "smooth",
          });
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, scrollParent, snap, setScrollData, scrollData.viewportHeight]);

  useBrowserLayoutEffect(() => {
    if (scrollParent) {
      scrollEvent();
      scrollParent.addEventListener("scroll", scrollEvent);
      scrollParent.addEventListener("resize", scrollEvent);
      return () => scrollParent.removeEventListener("scroll", scrollEvent);
    }
  }, [scrollEvent, scrollParent, scrollData.viewportHeight]);

  return (
    <div style={{ margin: 0, padding: 0, userSelect: "none" }}>
      <ScrollDataContext.Provider value={scrollData}>
        {(Array.isArray(children) &&
          children.map((child, index) => (
            <ScrollPageContext.Provider key={index} value={{ page: index }}>
              {child}
            </ScrollPageContext.Provider>
          ))) || (
          <ScrollPageContext.Provider value={{ page: 0 }}>
            {children}
          </ScrollPageContext.Provider>
        )}
      </ScrollDataContext.Provider>
    </div>
  );
};

export default ScrollContainer;
