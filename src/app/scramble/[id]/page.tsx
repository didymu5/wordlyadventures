import SCRAMBLE from "@/store/scramble/game.json";

import { Scramble } from "@/components/Scramble/Scramble";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <main className="flex min-h-screen flex-col items-center p-5 lg:p-24">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Word Scramble
      </h2>
      <Scramble scramble={SCRAMBLE} scramId={Number(id)} />
    </main>
  );
}
