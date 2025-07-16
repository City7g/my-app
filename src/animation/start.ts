import gsap from "gsap";

export const animateStartBlocksShow = (
  elements: NodeListOf<Element>,
  homeButton: Element
): Promise<void> => {
  const origins = ["right bottom", "left bottom", "right top", "left top"];

  elements.forEach((block, index) => {
    gsap.set(block, { transformOrigin: origins[index] });
  });

  gsap.set(homeButton, {
    opacity: 0,
    rotation: -180,
    scale: 0,
    transformOrigin: "center center",
  });

  const tl = gsap.timeline();

  return new Promise((resolve) => {
    tl.to(homeButton, {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    }).from(
      elements,
      {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        onComplete: resolve,
      },
      "-=0.2"
    );
  });
};

export const animateStartBlocksHide = (
  elements: NodeListOf<Element>,
  homeButton: Element
): Promise<void> => {
  const tl = gsap.timeline();

  return new Promise((resolve) => {
    tl.to(elements, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.08,
    }).to(
      homeButton,
      {
        opacity: 0,
        rotation: 180,
        scale: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: resolve,
      },
      "-=0.2"
    );
  });
};
