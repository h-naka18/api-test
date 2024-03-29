import { SquareboxType } from '@/types';
import Image from 'next/image'
import Link from 'next/link';

async function fetchAllSquarebox() {
  const res = await fetch(`${process.env.ROOT}/api/squarebox`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.squareboxes;
}

export default async function Home() {
  const squareboxes = await fetchAllSquarebox();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <Link
          href={"/websocket"}
          className="px-4 py-1 rounded-md font-semibold bg-green-400 hover:bg-green-200"
        >
          WebSocket Test
        </Link>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="fixed left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </a>
        <p className='text-2xl'>　＋　</p>
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://www.prisma.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="https://prismalens.vercel.app/header/logo-dark.svg"
            alt="prisma_logo"
            width={180}
            height={37}
            priority
          />
        </a>
        <p className='text-2xl'>　＋　</p>
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://supabase.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/supabase-logo-wordmark--dark.png"
            alt="supabase_logo"
            width={180}
            height={37}
            priority
          />
        </a>
        <p className='text-2xl'>　＋　</p>
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/vercel.svg"
            alt="Vercel Logo"
            width={180}
            height={37}
            priority
          />
        </a>
        <p className='text-2xl'>　＋　</p>
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://fastapi.tiangolo.com/ja/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/logo-teal.png"
            alt="FastAPI Logo"
            width={180}
            height={37}
            priority
          />
        </a>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div>
          <div className="flex flex-row-reverse w-full mb-3">
            <div>
              <Link
                href={"/squarebox/add"}
                className="px-4 py-1 text-center rounded-md font-semibold bg-red-400 m-auto hover:bg-red-200"
              >
                Add
              </Link>
            </div>
          </div>
          <div>
            <table className="table-fixed border-collapse border border-slate-400 bg-white text-center">
              <thead>
                <tr className="bg-blue-200">
                  <th className='w-20 border border-slate-300'></th>
                  <th className="w-20 border border-slate-300">ID</th>
                  <th className="w-20 border border-slate-300">Top</th>
                  <th className="w-20 border border-slate-300">Left</th>
                  <th className="w-20 border border-slate-300">Width</th>
                  <th className="w-20 border border-slate-300">Height</th>
                  <th className="w-20 border border-slate-300">Border</th>
                  <th className="w-32 border border-slate-300">BorderColor</th>
                  <th className="w-40 border border-slate-300">BackgroundColor</th>
                </tr>
              </thead>
              <tbody className=''>
                {squareboxes.map((squarebox: SquareboxType) => (
                  <tr key={squarebox.id}>
                    <td className='border border-slate-300'>
                      <Link
                        href={`/squarebox/edit/${squarebox.id}`}
                        className="px-4 py-1 text-center rounded-md text-sm font-semibold bg-blue-400 m-auto hover:bg-blue-200"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="border border-slate-300">{squarebox.id}</td>
                    <td className="border border-slate-300">{squarebox.top}</td>
                    <td className="border border-slate-300">{squarebox.left}</td>
                    <td className="border border-slate-300">{squarebox.width}</td>
                    <td className="border border-slate-300">{squarebox.height}</td>
                    <td className="border border-slate-300">{squarebox.border}</td>
                    <td className="border border-slate-300">{squarebox.bordercolor}</td>
                    <td className="border border-slate-300">{squarebox.backgroundcolor}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div>
        <div className='flex'>
          <p>クライアント側のソース：</p>
          <Link
            href={"https://github.com/h-naka18/api-test"}
            target="_blank"
          >
            <p className='underline'>https://github.com/h-naka18/api-test</p>
          </Link>
        </div>
        <div className='flex'>
          <p>サーバ側のソース：</p>
          <Link
            href={"https://github.com/h-naka18/fastapi-test"}
            target="_blank"
          >
            <p className='underline'>https://github.com/h-naka18/fastapi-test</p>
          </Link>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
