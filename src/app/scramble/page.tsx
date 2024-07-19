import SCRAMBLE from "@/store/scramble/game.json";

import { Scramble } from "@/components/Scramble/Scramble";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="flex flex-col items-center overflow-hidden pt-7">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Word Scramble
      </h2>
      <Scramble scramble={SCRAMBLE} />
    </main>
  );
}
