import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PixelBorder } from "@/components/ui/pixel-border";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeSwitcher } from "@/components/ui/themeSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeSwitcher />
      <Button variant={"default"} size={"sm"}>
        Click
      </Button>
      <PixelBorder>
        <Button variant={"warning"} size={"md"}>
          Click me 👑
        </Button>
      </PixelBorder>
      <Button variant={"success"} size={"lg"}>
        Click me
      </Button>
      <Button variant={"destructive"} size={"xl"}>
        Click me
      </Button>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Enter your name" />
      <Input variant={"primary"} placeholder="Enter your email" />
      <Input variant={"secondary"} placeholder="Enter your password" />
      <Input variant={"destructive"} placeholder="Enter your password" />
      <Input variant={"success"} placeholder="Enter your password" />
      <Input variant={"warning"} placeholder="Enter your password" />
      <Input variant={"error"} placeholder="Enter your password" />
      <Input variant={"disabled"} placeholder="Enter your password" />
      <Input variant={"outline"} placeholder="Enter your password" />

      <Card className="w-[300px] flex flex-col">
        <h1 className="text-3xl">Hello World</h1>
        <p className="text-lg">This is a card component</p>
        <Button size={"md"}>Default Button</Button>
      </Card>
    </main>
  );
}
