import { HomeIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <section className={cn("h-full", "grid place-items-center")}>
      <div className="flex flex-col items-center">
        <h1 className={cn("place-self-center", "text-lg")}>
          Not found resource
        </h1>
        <Button
          as={Link}
          href="/"
          startContent={<HomeIcon className="w-4 h-4" />}
          className="mt-4 w-fit"
        >
          Home
        </Button>
      </div>
    </section>
  );
};
