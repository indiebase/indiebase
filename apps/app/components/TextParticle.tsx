import React, { FC, useEffect, useRef } from "react";

var utils = {
  norm: function (value, min, max) {
    return (value - min) / (max - min);
  },

  lerp: function (norm, min, max) {
    return (max - min) * norm + min;
  },

  map: function (value, sourceMin, sourceMax, destMin, destMax) {
    return utils.lerp(
      utils.norm(value, sourceMin, sourceMax),
      destMin,
      destMax
    );
  },

  clamp: function (value, min, max) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
  },

  distance: function (p0, p1) {
    var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  distanceXY: function (x0, y0, x1, y1) {
    var dx = x1 - x0,
      dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  },

  circleCollision: function (c0, c1) {
    return utils.distance(c0, c1) <= c0.radius + c1.radius;
  },

  circlePointCollision: function (x, y, circle) {
    return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
  },

  pointInRect: function (x, y, rect) {
    return (
      utils.inRange(x, rect.x, rect.x + rect.radius) &&
      utils.inRange(y, rect.y, rect.y + rect.radius)
    );
  },

  inRange: function (value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  },

  rangeIntersect: function (min0, max0, min1, max1) {
    return (
      Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1)
    );
  },

  rectIntersect: function (r0, r1) {
    return (
      utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
      utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
    );
  },

  degreesToRads: function (degrees) {
    return (degrees / 180) * Math.PI;
  },

  radsToDegrees: function (radians) {
    return (radians * 180) / Math.PI;
  },

  randomRange: function (min, max) {
    return min + Math.random() * (max - min);
  },

  randomInt: function (min, max) {
    return min + Math.random() * (max - min + 1);
  },

  getmiddle: function (p0, p1) {
    const x = p0.x,
      x2 = p1.x;
    const middlex = (x + x2) / 2;
    const y = p0.y,
      y2 = p1.y;
    const middley = (y + y2) / 2;
    const pos = [middlex, middley];

    return pos;
  },

  getAngle: function (p0, p1) {
    var deltaX = p1.x - p0.x;
    var deltaY = p1.y - p0.y;
    var rad = Math.atan2(deltaY, deltaX);
    return rad;
  },
  inpercentW: function (size, W) {
    return (size * W) / 100;
  },

  inpercentH: function (size, H) {
    return (size * H) / 100;
  },

  validParams() {},
};

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];

class Shape {
  x: number;
  y: number;
  size = 100;
  text: string;
  placement: any[] = [];
  vectors: any[] = [];
  ctx: CanvasRenderingContext2D;
  speed: number;
  radius: number;
  gravity: number;
  duration: number;
  resolutionHeight: number;
  resolutionWidth: number;
  width: number;
  height: number;

  constructor(
    ctx,
    {
      x,
      y,
      text,
      speed,
      gravity,
      duration,
      resolutionWidth,
      resolutionHeight,
      radius,
      width,
      height,
      size,
    }
  ) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.resolutionHeight = resolutionWidth;
    this.resolutionWidth = resolutionHeight;
    this.speed = speed;
    this.gravity = gravity;
    this.duration = duration;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.text = text;
    this.size = size;

    this.placement = [];
    this.vectors = [];
  }

  setValue() {
    this.ctx.textAlign = "center";
    this.ctx.font = "bold " + this.size + "px arial";
    this.ctx.fillText(this.text, this.x, this.y);

    const idata = this.ctx.getImageData(0, 0, this.width, this.height);

    const buffer32 = new Uint32Array(idata.data.buffer);

    for (let y = 0; y < this.height; y += this.resolutionHeight) {
      for (let x = 0; x < this.width; x += this.resolutionWidth) {
        if (buffer32[y * this.width + x]) {
          this.placement.push(
            new Particle(this.ctx, {
              x,
              y,
              speed: this.speed,
              gravity: this.gravity,
              duration: this.duration,
              radius: this.radius,
            })
          );
        }
      }
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

class Particle {
  radius = 1.1;
  futurRadius;

  rebond = utils.randomInt(1, 5);
  private x: number;
  private y: number;
  speed;
  gravity;
  duration;

  private dying = false;
  base: [number, number];

  vx = 0;
  vy = 0;
  friction = 0.99;
  color = colors[Math.floor(Math.random() * colors.length)];
  ctx: CanvasRenderingContext2D;

  constructor(ctx, { x, y, speed, gravity, duration, radius }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.gravity = gravity;
    this.duration = duration;
    this.ctx = ctx;
    this.futurRadius = utils.randomInt(radius, radius + 3);

    this.base = [x, y];

    this.setSpeed(utils.randomInt(0.1, 0.5));
    this.setHeading(
      utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360))
    );
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  setSpeed(speed) {
    var heading = this.getHeading();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  }

  getHeading() {
    return Math.atan2(this.vy, this.vx);
  }

  setHeading(heading) {
    var speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  }

  angleTo(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    if (this.radius < this.futurRadius && this.dying === false) {
      this.radius += this.duration;
    } else {
      this.dying = true;
    }

    if (this.dying === true) {
      this.radius -= this.duration;
    }

    this.ctx.beginPath();

    this.ctx.fillStyle = this.color;

    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();

    if (this.y < 0 || this.radius < 1) {
      this.x = this.base[0];
      this.dying = false;
      this.y = this.base[1];
      this.radius = 1.1;
      this.setSpeed(this.speed);
      this.futurRadius = utils.randomInt(this.radius, this.radius + 5);
      this.setHeading(
        utils.randomInt(utils.degreesToRads(0), utils.degreesToRads(360))
      );
    }
  }
}

export interface TextParticleProps {
  text: string;
  resolution: number;
  boxWidth: number;
  boxHeight: number;
  radius?: number;
  gravity?: number;
  duration?: number;
  fps?: number;
  speed?: number;
  size?: number;
  [key: string]: any;
}

export const TextParticle: FC<TextParticleProps> = function (props) {
  const {
    fps,
    duration,
    radius,
    speed,
    gravity,
    text,
    resolution,
    boxWidth,
    boxHeight,
    size,
  } = props;

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = boxWidth!);
    const height = (canvas.height = boxHeight!);

    var message = new Shape(ctx, {
      x: width / 2,
      y: height / 2 + 50,
      text,
      gravity,
      speed,
      duration,
      resolutionWidth: resolution,
      resolutionHeight: resolution,
      radius,
      width,
      height,
      size,
    });

    message.setValue();

    function update() {
      setTimeout(function () {
        ctx?.clearRect(0, 0, width, height);

        // message.placement[0].update();
        for (var i = 0; i < message.placement.length; i++) {
          message.placement[i].update();
        }

        requestAnimationFrame(update);
      }, 1000 / fps!);
    }

    update();
  }, []);

  return <canvas ref={ref}></canvas>;
};

TextParticle.defaultProps = {
  fps: 100,
  duration: 0.2,
  radius: 2,
  speed: 0.1,
  gravity: 0,
  size: 100,
};
