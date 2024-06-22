import { SVGAttributes } from 'react';

export function ArrowDownRightOutlined(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
      />
    </svg>
  );
}
