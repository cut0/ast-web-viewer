import { FC, SVGAttributes } from "react";

type BackSvgIconProps = SVGAttributes<SVGElement> & {
  title: string;
};

export const BackSvgIcon: FC<BackSvgIconProps> = ({
  title,
  fill = "currentColor",
  ...svgProps
}) => {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <title>{title}</title>
      <path
        d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
        fill="currentColor"
      />
    </svg>
  );
};
