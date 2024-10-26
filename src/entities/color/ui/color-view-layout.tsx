import { cn } from "@nextui-org/theme";
import { HTMLAttributes, ReactNode } from "react";

type ColorViewLayoutProps = HTMLAttributes<HTMLElement> & {
  colorCodePreview: ReactNode;
  controlsList: ReactNode;
};

export const ColorViewLayout = ({
  colorCodePreview,
  controlsList,
  className,
  ...props
}: ColorViewLayoutProps) => {
  return (
    <article
      {...props}
      className={cn("px-3 py-2 relative", "md:p-5", className)}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          "md:flex-col md:h-full",
        )}
      >
        {colorCodePreview}
        {controlsList}
      </div>
    </article>
  );
};
