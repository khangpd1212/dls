import { SVGAttributes } from 'react';
function CustomBarVertical(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.1816 1L11.1816 17M6.09073 1L6.09073 9M0.999823 1L0.999823 17"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CustomBarVertical;
