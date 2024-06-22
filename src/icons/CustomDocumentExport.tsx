import { SVGAttributes } from 'react';
function CustomDocumentExport(props: SVGAttributes<SVGElement>) {
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
        d="M17 13.6008V10.8008C17 8.81256 15.3882 7.20078 13.4 7.20078H11.8C11.1373 7.20078 10.6 6.66352 10.6 6.00078V4.40078C10.6 2.41256 8.98823 0.800781 7 0.800781H5M7.4 0.800781H2.2C1.53726 0.800781 1 1.33804 1 2.00078V20.4008C1 21.0635 1.53726 21.6008 2.2 21.6008H15.8C16.4627 21.6008 17 21.0635 17 20.4008V10.4008C17 5.09885 12.7019 0.800781 7.4 0.800781Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3333 15.1341L13 12.4674M13 12.4674L10.3333 9.80078M13 12.4674H7.66667C6.19391 12.4674 5 13.6614 5 15.1341C5 16.6069 6.19391 17.8008 7.66667 17.8008H9"
        stroke="white"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CustomDocumentExport;
