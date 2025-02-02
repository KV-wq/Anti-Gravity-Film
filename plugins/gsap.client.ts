import { gsap } from "gsap";

export default defineNuxtPlugin(() => {
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
      }

      // Для остальных случаев
      else {
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
          x: "100%", // текущий экран уезжает вправо
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: done,
        });
      }
      // Для переходов с главной страницы
      else if (route.path === "/") {
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
      }
      // Для choose-color используем старую логику
      else if (route.path === "/choose-color") {
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
      }
      // Для остальных случаев
      else {
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
