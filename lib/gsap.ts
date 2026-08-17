import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Mobile browsers resize the viewport as the address bar hides/shows
  // while scrolling, which otherwise triggers a ScrollTrigger refresh
  // mid-scroll and throws off progress math for pinned sections.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// useEffect runs after the browser paints, so a GSAP .from() entrance
// animation set up inside one is visible in its final state for a frame
// before jumping to its "from" state and animating in — a flash on every
// navigation. useLayoutEffect runs before paint, so the hidden starting
// state is applied before the user ever sees the final one. Falls back to
// useEffect on the server, where useLayoutEffect warns and does nothing.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger, SplitText };
