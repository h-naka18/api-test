"use client";

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const postSquarebox = async (
  top: number | undefined,
  left: number | undefined,
  width: number | undefined,
  height: number | undefined,
  border: number | undefined,
  bordercolor: string | undefined,
  backgroundcolor: string | undefined
) => {
  const res = await fetch(`${process.env.ROOT}/api/squarebox`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ top, left, width, height, border, bordercolor, backgroundcolor }),
  });
  return res.json();
}

export default function PostSquarebox() {
  const router = useRouter();
  const topRef = useRef<HTMLInputElement | null>(null);
  const leftRef = useRef<HTMLInputElement | null>(null);
  const widthRef = useRef<HTMLInputElement | null>(null);
  const heightRef = useRef<HTMLInputElement | null>(null);
  const borderRef = useRef<HTMLInputElement | null>(null);
  const bordercolorRef = useRef<HTMLInputElement | null>(null);
  const backgroundcolorRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let value = topRef.current?.value;
    let topValue = value ? parseFloat(value) : undefined;

    const toastId = toast.loading("登録中です・・・");

    await postSquarebox(
      topRef.current?.value ? parseInt(topRef.current.value) : undefined,
      leftRef.current?.value ? parseInt(leftRef.current.value) : undefined,
      widthRef.current?.value ? parseInt(widthRef.current.value) : undefined,
      heightRef.current?.value ? parseInt(heightRef.current.value) : undefined,
      borderRef.current?.value ? parseInt(borderRef.current.value) : undefined,
      bordercolorRef.current?.value,
      backgroundcolorRef.current?.value
    );
    toast.dismiss(toastId);
    router.push("/");
    router.refresh();
  }

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <Toaster />
      <div className="w-1/4 m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-700 font-bold p-3">Add New Squarebox 🚀</p>
          <form>
            <label>
              top:
              <input
                name="top"
                ref={topRef}
                placeholder="top"
                type="number"
                className="rounded-md px-4 w-full py-2 my-2"
              />
            </label>
            <label>
              left:
              <input
                ref={leftRef}
                placeholder="left"
                type="number"
                className="rounded-md px-4 w-full py-2 my-2"
              ></input>
            </label>
            <label>
              width:
              <input
                ref={widthRef}
                placeholder="width"
                type="number"
                className="rounded-md px-4 w-full py-2 my-2"
              ></input>
            </label>
            <label>
              height:
              <input
              ref={heightRef}
              placeholder="height"
              type="number"
              className="rounded-md px-4 w-full py-2 my-2"
            ></input>
            </label>
            <label>
              border:
              <input
              ref={borderRef}
              placeholder="border"
              type="number"
              className="rounded-md px-4 w-full py-2 my-2"
            ></input>
            </label>
            <label>
              bordercolor:
              <input
              ref={bordercolorRef}
              placeholder="bordercolor"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            ></input>
            </label>
            <label>
              backgroundcolor:
              <input
              ref={backgroundcolorRef}
              placeholder="backgroundcolor"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            ></input>
            </label>
            <div className="flex flex-row-reverse w-full">
              <div className='ml-2'>
                <button onClick={handleCancel} className="font-semibold px-4 py-2 shadow-xl bg-yellow-400 rounded-lg m-auto hover:bg-yellow-200">
                  Cancel
                </button>
              </div>
              <div>
                <button onClick={handleSubmit} className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-200">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
