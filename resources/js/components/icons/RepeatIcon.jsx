import React from "react";
export const RepeatIcon = ({size = 24, fill = "currentColor", width, height, ...props}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 -960 960 960"
    width={size || width}
    {...props}
  >
    <path
      d="M440-176q-99-14-163.5-89T212-440q0-53 21-101.5t57-86.5l20 20q-35 33-52.5 76.5T240-440q0 88 56.5 154.5T440-204v28Zm80 2v-28q86-20 143-85.5T720-440q0-100-70-170t-170-70h-32l70 70-20 20-104-104 104-104 20 20-70 70h32q112 0 190 78t78 190q0 100-65 174t-163 92Z"
      fill={fill}
    />
  </svg>
);
