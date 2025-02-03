import { gsap } from "gsap";
import { useModalStore } from "~/store/modalStore";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  let isAnimating = false;
  let touchStartY = 0;
  let touchStartX = 0;
  let wheelTimeout: NodeJS.Timeout;
  let transitionDirection = "next";
  let isModalOpen = false;

  const routes = ["/", "/choose-color", "/products", "/video-review", "/video"];

  const getNextRoute = (direction: "next" | "prev") => {
    const currentIndex = routes.indexOf(router.currentRoute.value.path);
    transitionDirection = direction;

    if (direction === "next" && currentIndex < routes.length - 1) {
      return routes[currentIndex + 1];
    } else if (direction === "prev" && currentIndex > 0) {
      return routes[currentIndex - 1];
    }
    return null;
  };

  const handleScroll = (deltaY: number, deltaX: number = 0) => {
    if (isAnimating) return;

    // Определяем направление на основе большего значения дельты
    const direction =
      Math.abs(deltaY) > Math.abs(deltaX)
        ? deltaY > 0
          ? "next"
          : "prev"
        : deltaX > 0
        ? "next"
        : "prev";

    const nextRoute = getNextRoute(direction);

    if (nextRoute) {
      isAnimating = true;
      router.push(nextRoute);
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    } else {
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      handleScroll(e.deltaY, e.deltaX);
    }, 50);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isAnimating) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;

    const deltaY = touchStartY - touchEndY;
    const deltaX = touchStartX - touchEndX;

    // Используем тот же порог в 50px для обоих направлений
    if (Math.abs(deltaY) > 50 || Math.abs(deltaX) > 50) {
      handleScroll(deltaY, deltaX);
    }
  };

  if (process.client) {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  const pageTransition = {
    name: "page-transition",
    mode: "",
    onEnter: (el: Element, done: () => void) => {
      const initialX = transitionDirection === "next" ? "100%" : "-100%";

      gsap.set(el, {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        opacity: 0,
        x: initialX,
        zIndex: 1,
      });

      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(el, { clearProps: "position,left,top,width,zIndex" });
          done();
        },
      });
    },
    onLeave: (el: Element, done: () => void) => {
      const exitX = transitionDirection === "next" ? "-100%" : "100%";

      gsap.set(el, {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        zIndex: 0,
      });

      gsap.to(el, {
        opacity: 0,
        x: exitX,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: done,
      });
    },
  };

  return {
    provide: {
      pageTransition,
    },
  };
});
