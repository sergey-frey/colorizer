import { useRouter, useSearchParams } from "next/navigation";
import { SearchParams } from "../constants/navigation";

export const useBackNavigate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams?.get(SearchParams.from);

  const navigateBack = () => {
    router.push(fromUrl ?? "/");
  };

  return { fromUrl, navigateBack };
};
