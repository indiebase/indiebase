import { is } from '@deskbtm/gadgets/is';
import * as React from 'react';
import { SVGProps } from 'react';

interface IndiebaseSVGProps extends SVGProps<SVGSVGElement> {
  itemsColor?: string | string[];
}

export const IndiebaseSVG = (props: IndiebaseSVGProps) => {
  let p = Object.assign(
    {},
    {
      itemsColor: ['#FF6895', '#908AE6', '#62BCC5', '#F9B45A'],
    },
    props,
  );

  const { itemsColor, ...rest } = p;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={380}
      height={380}
      fill="none"
      viewBox="0 0 380 380"
      {...rest}
    >
      <rect
        width={91.266}
        height={380}
        x={291.932}
        y={23.231}
        fill={is.string(itemsColor) ? itemsColor : itemsColor?.[0]}
        fillOpacity={0.8}
        rx={15}
        transform="rotate(45 291.932 23.231)"
      />
      <rect
        width={91.266}
        height={380}
        x={20.908}
        y={89.246}
        fill={is.string(itemsColor) ? itemsColor : itemsColor?.[1]}
        fillOpacity={0.8}
        rx={15}
        transform="rotate(-45 20.908 89.246)"
      />
      <rect
        width={91.266}
        height={380}
        x={141.877}
        fill={is.string(itemsColor) ? itemsColor : itemsColor?.[2]}
        fillOpacity={0.8}
        rx={15}
      />
      <rect
        width={91.266}
        height={380}
        y={235.633}
        fill={is.string(itemsColor) ? itemsColor : itemsColor?.[3]}
        fillOpacity={0.8}
        rx={15}
        transform="rotate(-90 0 235.633)"
      />
    </svg>
  );
};
