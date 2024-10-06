"use client";

import { SearchParams } from "@/src/shared/constants/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const BackLink = () => {
  const searchParams = useSearchParams();
  const fromUrl = searchParams?.get(SearchParams.from);

  if (!fromUrl) return null;

  return (
    <Button as={Link} href={fromUrl} size="sm" variant="light" isIconOnly>
      <ArrowLeftIcon className="w-5" />
    </Button>
  );
};
