import React from "react";

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fill1?: string;
  fill2?: string;
}

const MenuIcon = ({
  className,
  width = 24,
  height = 24,
  fill1 = "#1C1C1C",
  fill2 = "#DF1463",
  ...props
}: MenuIconProps): React.JSX.Element => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="4" r="2" fill={fill1} />
    <circle cx="12" cy="12" r="2" fill={fill2} />
    <circle cx="12" cy="20" r="2" fill={fill1} />
  </svg>
);

export default MenuIcon;
