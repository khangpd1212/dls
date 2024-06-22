import { SVGAttributes } from 'react';
function CustomGoogleAds(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_3579_70252)">
        <path
          d="M0.36975 11.121L5.68037 2.0293C6.35494 2.42644 9.75656 4.30895 10.3059 4.66699L4.9953 13.7592C4.41451 14.5265 -0.366059 12.2854 0.36975 11.1205V11.121Z"
          fill="#FBBC04"
        />
        <path
          d="M15.6286 11.1201L10.318 2.02894C9.57554 0.793384 7.97658 0.344376 6.66324 1.07412C5.34989 1.80387 4.94999 3.37584 5.69243 4.66656L11.003 13.7588C11.7455 14.9938 13.3445 15.4428 14.6578 14.7131C15.9138 13.9833 16.371 12.3556 15.6286 11.1211V11.1201Z"
          fill="#4285F4"
        />
        <path
          d="M2.66776 15.0644C4.14004 15.0644 5.33356 13.9005 5.33356 12.4648C5.33356 11.0291 4.14004 9.86523 2.66776 9.86523C1.19548 9.86523 0.00195312 11.0291 0.00195312 12.4648C0.00195312 13.9005 1.19548 15.0644 2.66776 15.0644Z"
          fill="#34A853"
        />
      </g>
      <defs>
        <clipPath id="clip0_3579_70252">
          <rect
            width="16"
            height="14.3713"
            fill="white"
            transform="translate(0 0.722656)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CustomGoogleAds;
