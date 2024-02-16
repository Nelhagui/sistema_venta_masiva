import React from "react";
export const SaveIcon = ({size = 24, fill = "currentColor", width, height, ...props}) => (
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
      d="M800-663.077v438.462Q800-197 781.5-178.5 763-160 735.385-160h-510.77Q197-160 178.5-178.5 160-197 160-224.615v-510.77Q160-763 178.5-781.5 197-800 224.615-800h438.462L800-663.077ZM760-646 646-760H224.615q-10.769 0-17.692 6.923T200-735.385v510.77q0 10.769 6.923 17.692T224.615-200h510.77q10.769 0 17.692-6.923T760-224.615V-646ZM480-298.461q33.077 0 56.539-23.462Q560-345.384 560-378.461T536.539-435Q513.077-458.462 480-458.462T423.461-435Q400-411.538 400-378.461t23.461 56.538q23.462 23.462 56.539 23.462Zm-209.231-270.77h296.924v-120H270.769v120ZM200-646v446-560 114Z"
      fill={fill}
    />
  </svg>
);