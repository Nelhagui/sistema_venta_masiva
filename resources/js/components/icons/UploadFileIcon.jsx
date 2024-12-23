import React from "react";
export const UploadFileIcon = ({size = 24, fill = "currentColor", width, height, ...props}) => (
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
      d="M450.001-224.617h59.998v-177.386L584-328.002l42.153-42.768L480-516.923 333.847-370.77l42.768 42.153 73.386-73.386v177.386ZM252.309-100.001q-30.308 0-51.308-21t-21-51.308v-615.382q0-30.308 21-51.308t51.308-21h317.692l209.998 209.998v477.692q0 30.308-21 51.308t-51.308 21H252.309Zm287.692-520V-800H252.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v615.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h455.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-447.692H540.001ZM240-800v179.999V-800v640V-800Z"
      fill={fill}
    />
  </svg>
);
