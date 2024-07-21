import { useMenuStore } from "@/store/mainMenuStore";
import { useRouter } from "next/navigation";

export const useNavigationStore = () => {
  const router = useRouter();
  const menuStore = useMenuStore();

  return {
    ...menuStore,
    handleMenuSelect: (path: string) => {
      menuStore.handleMenuSelect(path);
      router.push(path);
    },
    handleBack: () => {
      menuStore.handleBack();
      router.back();
    },
  };
};
