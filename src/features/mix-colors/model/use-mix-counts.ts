import { Color } from "@/src/shared/types/color.types";
import { useState } from "react";

export const useMixCounts = () => {
  const [mixCounts, setMixCountsMap] = useState<Map<Color, number>>(
    new Map(),
  );

  const increment = (color: Color) => {
    setMixCountsMap((prev) =>
      new Map(prev).set(color, (prev.get(color) ?? 0) + 1),
    );
  };

  const decrement = (color: Color) => {
    setMixCountsMap((prev) =>
      new Map(prev).set(color, Math.max((prev.get(color) ?? 0) - 1, 0)),
    );
  };

  return {
    mixCounts,
    mixCountsMethods: {
      increment,
      decrement,
    },
  };
};
