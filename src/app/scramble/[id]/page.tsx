import SCRAMBLE from "@/store/scramble/game.json";

import { Scramble } from "@/components/Scramble/Scramble";
import Link from "next/link";
import { ScrambleComplete } from "@/components/Scramble/ScrambleComplete";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!SCRAMBLE[Number(id)]) {
    return (
      <>
        {SCRAMBLE.length !== Number(id) && (
          <h3>
            There was an error with this page. <Link href="/"> Try again</Link>
          </h3>
        )}
        {SCRAMBLE.length === Number(id) && (
          <ScrambleComplete scramble={SCRAMBLE} />
        )}
      </>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-5 lg:p-24">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Word Scramble
      </h2>
      {SCRAMBLE[Number(id)] && (
        <Scramble scramble={SCRAMBLE} scramId={Number(id)} />
      )}
    </main>
  );
}
