import { SVGAttributes } from 'react';
function CustomChartPieTag(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.4021 14.9555C10.9383 15.4916 11.8076 15.4916 12.3437 14.9555L14.6874 12.6117M11.3729 15.3576C10.6147 15.3576 10 14.7429 10 13.9847V9.17945C10 8.95198 10.1844 8.76758 10.4119 8.76758H12.334C12.5614 8.76758 12.7458 8.95198 12.7458 9.17945V10.6701M11.3729 15.3576C12.1312 15.3576 12.7458 14.7429 12.7458 13.9847V10.6701M11.3729 15.3576H16.1781C16.4056 15.3576 16.59 15.1732 16.59 14.9457V13.0236C16.59 12.7961 16.4056 12.6117 16.1781 12.6117H14.6874M12.7458 10.6701L13.7999 9.61607C13.9608 9.45522 14.2215 9.45522 14.3824 9.61607L15.7415 10.9752C15.9024 11.136 15.9024 11.3968 15.7415 11.5577L14.6874 12.6117M11.3729 13.9847H11.3757V13.9874H11.3729V13.9847Z"
        stroke="white"
        stroke-width="0.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.31373 2.43447C2.93132 2.43447 1 4.3658 1 6.7482C1 9.1306 2.93132 11.0619 5.31373 11.0619C7.69613 11.0619 9.62745 9.1306 9.62745 6.7482H5.31373V2.43447Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.03922 5.02271H11.3529C11.3529 2.64031 9.42162 0.708984 7.03922 0.708984V5.02271Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CustomChartPieTag;
