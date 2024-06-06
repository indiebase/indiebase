import {
  confetti as confettiLib,
  type ConfettiOptions,
} from '@tsparticles/confetti';

export const shoot = () => {
  const defaults = {
    spread: 999,
    ticks: 50,
    gravity: 0.4,
    decay: 0.97,
    startVelocity: 30,
  } satisfies ConfettiOptions;

  confettiLib({
    ...defaults,
    particleCount: 80,
    scalar: 2,
    shapes: ['circle', 'square'],
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  });

  confettiLib({
    ...defaults,
    particleCount: 50,
    scalar: 2.5,
    shapes: ['emoji'],
    shapeOptions: {
      emoji: {
        value: ['🦄', '🌈', '🎉', '🤯', '🍭'],
      },
    },
  });
};

const burst = () => {
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
  setTimeout(shoot, 300);
};

export const confetti = { burst, shoot };
