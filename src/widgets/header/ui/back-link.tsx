"use client";

import { useBackNavigate } from "@/src/shared/utils/use-back-navigate";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export const BackLink = () => {
  const { fromUrl } = useBackNavigate();

  if (!fromUrl) return null;

  return (
    <Button as={Link} href={fromUrl} size="sm" variant="light" isIconOnly>
      <ArrowLeftIcon className="w-5" />
    </Button>
  );
};
