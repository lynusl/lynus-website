import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>
          lynus website
        </h1>
        <h3>
          a website by lynus
        </h3>

        <nav> 
          check out my <Link href="/guitar" className="underline text-sky-500 hover:text-sky-700 visited:text-purple-600">guitar app</Link> 
          </nav>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
