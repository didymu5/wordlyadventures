import { Game } from "@/components/Game/Game";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/scramble"}>Word Scramble</Link>
    </main>
  );
}
