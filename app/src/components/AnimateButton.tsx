import { FC, forwardRef } from 'react';
import { motion, useCycle } from 'framer-motion';

export interface AnimateButtonProps {
  [key: string]: any;
}

export const AnimateButton: FC<AnimateButtonProps> = forwardRef(
  ({ children, type, direction, offset, scale }, ref) => {
    let offset1;
    let offset2;
    switch (direction) {
      case 'up':
      case 'left':
        offset1 = offset;
        offset2 = 0;
        break;
      case 'right':
      case 'down':
      default:
        offset1 = 0;
        offset2 = offset;
        break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
      case 'rotate':
        return (
          <motion.div
            ref={ref as any}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2,
              repeatDelay: 0,
            }}
          >
            {children}
          </motion.div>
        );
      case 'slide':
        if (direction === 'up' || direction === 'down') {
          return (
            <motion.div
              ref={ref as any}
              animate={{ y: y !== undefined ? y : '' }}
              onHoverEnd={() => cycleY()}
              onHoverStart={() => cycleY()}
            >
              {children}
            </motion.div>
          );
        }
        return (
          <motion.div
            ref={ref as any}
            animate={{ x: x !== undefined ? x : '' }}
            onHoverEnd={() => cycleX()}
            onHoverStart={() => cycleX()}
          >
            {children}
          </motion.div>
        );

      case 'scale':
      default:
        if (typeof scale === 'number') {
          scale = {
            hover: scale,
            tap: scale,
          };
        }
        return (
          <motion.div
            ref={ref as any}
            whileHover={{ scale: scale?.hover }}
            whileTap={{ scale: scale?.tap }}
          >
            {children}
          </motion.div>
        );
    }
  },
);

AnimateButton.defaultProps = {
  type: 'scale',
  offset: 10,
  direction: 'right',
  scale: {
    hover: 1,
    tap: 0.9,
  },
};
