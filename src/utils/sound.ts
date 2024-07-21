export const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.play();
};

export const soundConfig = {
  sounds: {
    confirm: {
      src: "sounds/menu-confirm.mp3",
      volume: 0.5,
    },
    cancel: {
      src: "sounds/menu-cancel.mp3",
      volume: 0.5,
    },
  },
};
