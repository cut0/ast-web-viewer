import { FC, SVGAttributes } from "react";

type CloseSvgIconProps = SVGAttributes<SVGElement> & {
  title: string;
};

export const CloseSvgIcon: FC<CloseSvgIconProps> = ({
  title,
  fill = "currentColor",
  ...svgProps
}) => {
  return (
    <svg
      fill="none"
      height="12"
      viewBox="0 0 11 12"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <title>{title}</title>
      <path
        d="M0.362599 11.007C-0.027925 10.6165 -0.0279254 9.98333 0.362599 9.59281L8.89864 1.05677C9.28916 0.666242 9.92233 0.666242 10.3129 1.05677L10.6291 1.37303C11.0196 1.76356 11.0196 2.39672 10.6291 2.78725L2.09308 11.3233C1.70255 11.7138 1.06939 11.7138 0.678865 11.3233L0.362599 11.007Z"
        fill="black"
      />
      <path
        d="M0.67886 1.05675C1.06938 0.666224 1.70255 0.666224 2.09307 1.05675L10.6291 9.59279C11.0196 9.98331 11.0196 10.6165 10.6291 11.007L10.3128 11.3233C9.92233 11.7138 9.28916 11.7138 8.89864 11.3233L0.362596 2.78723C-0.0279287 2.3967 -0.0279292 1.76354 0.362595 1.37301L0.67886 1.05675Z"
        fill="black"
      />
    </svg>
  );
};
