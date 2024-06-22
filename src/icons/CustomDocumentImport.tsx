import { SVGAttributes } from 'react';
function CustomDocumentImport(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 13.8V11C17 9.01177 15.3882 7.4 13.4 7.4H11.8C11.1373 7.4 10.6 6.86274 10.6 6.2V4.6C10.6 2.61177 8.98823 1 7 1H5M7.4 1H2.2C1.53726 1 1 1.53726 1 2.2V20.6C1 21.2627 1.53726 21.8 2.2 21.8H15.8C16.4627 21.8 17 21.2627 17 20.6V10.6C17 5.29807 12.7019 1 7.4 1Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.66667 15.3333L5 12.6667M5 12.6667L7.66667 10M5 12.6667H10.3333C11.8061 12.6667 13 13.8606 13 15.3333C13 16.8061 11.8061 18 10.3333 18H9"
        stroke="white"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CustomDocumentImport;
