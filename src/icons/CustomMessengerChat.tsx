import { SVGAttributes } from 'react';
function CustomMessengerChat(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_2816_92393)">
        <path
          d="M8 0C3.49337 0 0 3.30113 0 7.76C0 10.0923 0.955813 12.1076 2.5125 13.4997C2.64313 13.6166 2.722 13.7805 2.72738 13.9558L2.77094 15.3789C2.78487 15.8328 3.25369 16.1282 3.66906 15.9448L5.25694 15.2437C5.39152 15.1844 5.54246 15.1734 5.68425 15.2124C6.41394 15.4131 7.1905 15.5199 8 15.5199C12.5066 15.5199 16 12.2188 16 7.75994C16 3.30106 12.5066 0 8 0Z"
          fill="url(#paint0_radial_2816_92393)"
        />
        <path
          d="M3.19655 10.0294L5.54655 6.3011C5.9203 5.70797 6.7208 5.56029 7.28167 5.98091L9.15073 7.38279C9.2342 7.44539 9.3358 7.47909 9.44014 7.47879C9.54448 7.47849 9.64588 7.44419 9.72898 7.3811L12.2532 5.46535C12.5901 5.20966 13.03 5.61285 12.8045 5.97066L10.4545 9.69904C10.0807 10.2921 9.28011 10.4398 8.7193 10.0192L6.85017 8.61729C6.76671 8.55471 6.66514 8.52103 6.56083 8.52133C6.45651 8.52164 6.35514 8.55591 6.27205 8.61897L3.74767 10.5347C3.4108 10.7903 2.97098 10.3872 3.19655 10.0294Z"
          fill="white"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_2816_92393"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(307.952 1591.44) scale(1743.36 1743.36)"
        >
          <stop stop-color="#0099FF" />
          <stop offset="0.60975" stop-color="#A033FF" />
          <stop offset="0.93482" stop-color="#FF5280" />
          <stop offset="1" stop-color="#FF7061" />
        </radialGradient>
        <clipPath id="clip0_2816_92393">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CustomMessengerChat;
