import { gsap } from "gsap";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  let isAnimating = false;
  let touchStartY = 0;
  let touchStartX = 0;
  let wheelTimeout: NodeJS.Timeout;

  // Функция для определения следующей страницы
  const getNextRoute = (direction: "next" | "prev") => {
    const routes = ["/choose-color", "/", "/products", "/video-review"]; // Добавьте все ваши роуты в нужном порядке
    const currentIndex = routes.indexOf(router.currentRoute.value.path);

    if (direction === "next" && currentIndex < routes.length - 1) {
      return routes[currentIndex + 1];
    } else if (direction === "prev" && currentIndex > 0) {
      return routes[currentIndex - 1];
    }
    return null;
  };

  // Обработчик колесика мыши
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      if (isAnimating) return;

      const direction = e.deltaY > 0 ? "next" : "prev";
      const nextRoute = getNextRoute(direction);

      if (nextRoute) {
        isAnimating = true;
        router.push(nextRoute);
        setTimeout(() => {
          isAnimating = false;
        }, 1000);
      }
    }, 50);
  };

  // Обработчики тач-событий
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

    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      const direction = deltaY > 0 ? "next" : "prev";
      const nextRoute = getNextRoute(direction);

      if (nextRoute) {
        isAnimating = true;
        router.push(nextRoute);
        setTimeout(() => {
          isAnimating = false;
        }, 1000);
      }
    }
  };

  // Добавляем обработчики при монтировании
  if (process.client) {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  const pageTransition = {
    name: "page-transition",
    mode: "",
    onEnter: (el: Element, done: () => void) => {
      const route = useRoute();
      const fromPath = useRouter().options.history.state.back;

      if (route.path === "/choose-color") {
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          opacity: 0,
          x: "100%",
          zIndex: 1,
        });
      } else if (useRouter().options.history.state.current == "/choose-color") {
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          opacity: 0,
          x: "-100%",
          zIndex: 1,
        });
      } else if (fromPath === "/") {
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          opacity: 0,
          x: "100%",
          zIndex: 1,
        });
      } else {
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          opacity: 0,
          x: "-100%",
          zIndex: 1,
        });
      }

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
      const route = useRoute();
      const toPath = useRouter().options.history.state.current;

      if (toPath === "/choose-color") {
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 0,
        });

        gsap.to(el, {
          opacity: 0,
          x: "100%",
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: done,
        });
      } else if (route.path === "/") {
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 0,
        });

        gsap.to(el, {
          opacity: 0,
          x: "-100%",
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: done,
        });
      } else if (route.path === "/choose-color") {
        const isForward = toPath == "/";
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 0,
        });

        gsap.to(el, {
          opacity: 0,
          x: isForward ? "-100%" : "100%",
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: done,
        });
      } else {
        gsap.set(el, {
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 0,
        });

        gsap.to(el, {
          opacity: 0,
          x: "100%",
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: done,
        });
      }
    },
  };

  return {
    provide: {
      pageTransition,
    },
  };
});
