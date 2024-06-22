import { SVGAttributes } from 'react';

export function ArrowUturnDownOutlined(props: SVGAttributes<SVGElement>) {
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
        d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3"
      />
    </svg>
  );
}
