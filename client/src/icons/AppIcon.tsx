import * as React from "react";

export default function AppIcon(props: React.HtmlHTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      className="w-icon"
      viewBox="0 0 5 5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="1" width="1" x="1" y="1" fill="#2575d0" />
      <rect height="1" width="1" x="1" y="2" fill="#3bd075" />
      <rect height="1" width="1" x="1" y="3" fill="#00e4f5" />
      <rect height="1" width="1" x="2" y="1" fill="#f655f6" />
      <rect height="1" width="1" x="3" y="1" fill="#ffa033" />
      <rect height="1" width="1" x="3" y="2" fill="#bfe602" />
      <rect height="1" width="1" x="3" y="3" fill="#ab58ff" />
    </svg>
  );
}
