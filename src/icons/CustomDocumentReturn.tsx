import { SVGAttributes } from 'react';
function CustomDocumentReturn(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.1534 10.8462V8.69231C14.1534 7.1629 12.9136 5.92308 11.3842 5.92308H10.1534C9.64359 5.92308 9.23032 5.5098 9.23032 5V3.76923C9.23032 2.23983 7.99049 1 6.46109 1H4.92263M6.76878 1H2.76878C2.25898 1 1.8457 1.41328 1.8457 1.92308V16.0769C1.8457 16.5867 2.25898 17 2.76878 17H13.2303C13.7401 17 14.1534 16.5867 14.1534 16.0769V8.38462C14.1534 4.30621 10.8472 1 6.76878 1Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 13L5 11M5 11L7 9M5 11H9C10.1046 11 11 11.8954 11 13C11 14.1046 10.1046 15 9 15H8"
        stroke="white"
        stroke-width="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CustomDocumentReturn;
