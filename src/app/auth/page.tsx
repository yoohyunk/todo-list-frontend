"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/actions/auth";

export default function page() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        signIn(
          (target.elements.namedItem("email") as HTMLInputElement).value,
          (target.elements.namedItem("password") as HTMLInputElement).value
        );
      }}
      className="flex items-center justify-center mt-14"
    >
      <Card className="flex-col items-center size-2/4 gap-y-8">
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign in</CardTitle>
        </CardHeader>

        <CardContent className="flex-col gap-5">
          <div>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div>
            <Input type="password" id="password" placeholder="Password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="outline">
            Button
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
