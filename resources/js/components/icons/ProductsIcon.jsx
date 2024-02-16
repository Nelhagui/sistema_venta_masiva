import React from "react";
export const ProductsIcon = ({size = 24, fill = "currentColor", width, height, ...props}) => (
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
      d="M224.615-120q-26.846 0-45.731-18.884Q160-157.769 160-184.615v-444.846q-17.231-7.154-28.616-23.116Q120-668.538 120-689.231v-86.154q0-26.846 18.884-45.731Q157.769-840 184.615-840h590.77q26.846 0 45.731 18.884Q840-802.231 840-775.385v86.154q0 20.693-11.384 36.654-11.385 15.962-28.616 23.116v444.846q0 26.846-18.884 45.731Q762.231-120 735.385-120h-510.77ZM200-624.615v436.154q0 12.307 8.846 20.384T230.769-160h504.616q10.769 0 17.692-6.923T760-184.615v-440H200Zm-15.385-40h590.77q10.769 0 17.692-6.924Q800-678.462 800-689.231v-86.154q0-10.769-6.923-17.692T775.385-800h-590.77q-10.769 0-17.692 6.923T160-775.385v86.154q0 10.769 6.923 17.692 6.923 6.924 17.692 6.924Zm190.77 219.231h209.23V-480h-209.23v34.616ZM480-392.308Z"
      fill={fill}
    />
  </svg>
);