import { Button } from "@/components/ui/button";
import TestButton from "@/components/ui/test";
import { ThemeSwitcher } from "@/components/ui/themeSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeSwitcher />
      <Button variant={"default"} size={"sm"}>
        Click me
      </Button>
      <Button variant={"warning"} size={"md"}>
        Click me
      </Button>
      <Button variant={"success"} size={"lg"}>
        Click me
      </Button>
      <Button variant={"destructive"} size={"xl"}>
        Click me
      </Button>
      <TestButton>Click me</TestButton>
    </main>
  );
}
