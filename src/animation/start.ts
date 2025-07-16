import gsap from "gsap";

export const animateStartBlocksShow = (elements: NodeListOf<Element>): Promise<void> => {
  const origins = ["right bottom", "left bottom", "right top", "left top"];

  elements.forEach((block, index) => {
    gsap.set(block, { transformOrigin: origins[index] });
  });

  return new Promise((resolve) => {
    gsap.from(elements, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      onComplete: resolve,
    });
  });
};

export const animateStartBlocksHide = (elements: NodeListOf<Element>): Promise<void> => {
  return new Promise((resolve) => {
    gsap.to(elements, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.08,
      onComplete: resolve,
    });
  });
};
