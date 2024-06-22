import { SVGAttributes } from 'react';
function CustomFacebook(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 8.2168C16 3.79855 12.4183 0.216797 8 0.216797C3.58175 0.216797 0 3.79855 0 8.2168C0 12.2098 2.9255 15.5195 6.75 16.1196V10.5293H4.71875V8.2168H6.75V6.4543C6.75 4.4493 7.94438 3.3418 9.77175 3.3418C10.647 3.3418 11.5625 3.49805 11.5625 3.49805V5.4668H10.5538C9.55994 5.4668 9.25 6.08348 9.25 6.71617V8.2168H11.4688L11.1141 10.5293H9.25V16.1196C13.0745 15.5195 16 12.2099 16 8.2168Z"
        fill="#1877F2"
      />
    </svg>
  );
}

export default CustomFacebook;
