import Image from "next/image";

import { main } from "@yotai/jobs";

export default async function Home() {
  await main();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
    </main>
  );
}
