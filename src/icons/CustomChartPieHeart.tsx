import { SVGAttributes } from 'react';
function CustomChartPieHeart(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.9996 11.5678C16.9996 10.7645 16.2534 10.1133 15.3329 10.1133C14.6447 10.1133 14.0539 10.4773 13.7996 10.9968C13.5453 10.4773 12.9545 10.1133 12.2663 10.1133C11.3458 10.1133 10.5996 10.7645 10.5996 11.5678C10.5996 13.9017 13.7996 15.4466 13.7996 15.4466C13.7996 15.4466 16.9996 13.9017 16.9996 11.5678Z"
        stroke="white"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.60131 2.35419C3.06008 2.35419 1 4.41427 1 6.9555C1 9.49673 3.06008 11.5568 5.60131 11.5568C8.14254 11.5568 10.2026 9.49673 10.2026 6.9555H5.60131V2.35419Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.44183 5.11498H12.0431C12.0431 2.57375 9.98306 0.513672 7.44183 0.513672V5.11498Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CustomChartPieHeart;
