import { signOut } from "@/actions/auth";
import { SignoutButton } from "@/components/SignoutButton";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <SignoutButton />
    </div>
  );
}
