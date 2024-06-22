import { SVGAttributes } from 'react';

export function ArrowUpLeftOutlined(props: SVGAttributes<SVGElement>) {
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
        d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
      />
    </svg>
  );
}
