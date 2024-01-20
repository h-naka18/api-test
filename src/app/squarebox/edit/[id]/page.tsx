"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const editSquarebox = async (
  top: number | undefined,
  left: number | undefined,
  width: number | undefined,
  height: number | undefined,
  border: number | undefined,
  bordercolor: string | undefined,
  backgroundcolor: string | undefined,
  id: number
) => {
  const res = await fetch(`${process.env.ROOT}/api/squarebox/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ top, left, width, height, border, bordercolor, backgroundcolor, id }),
  });
  return res.json();
};

const getSquareboxById = async (id: number) => {
  const res = await fetch(`${process.env.ROOT}/api/squarebox/${id}`);
  const data = await res.json();
  return data.squarebox;
};

const deleteSquarebox = async (id: number) => {
  const res = await fetch(`${process.env.ROOT}/api/squarebox/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const EditSquarebox = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const topRef = useRef<HTMLInputElement | null>(null);
  const leftRef = useRef<HTMLInputElement | null>(null);
  const widthRef = useRef<HTMLInputElement | null>(null);
  const heightRef = useRef<HTMLInputElement | null>(null);
  const borderRef = useRef<HTMLInputElement | null>(null);
  const bordercolorRef = useRef<HTMLInputElement | null>(null);
  const backgroundcolorRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const toastId = toast.loading("編集中です・・・");
    await editSquarebox(
      topRef.current?.value ? parseInt(topRef.current.value) : undefined,
      leftRef.current?.value ? parseInt(leftRef.current.value) : undefined,
      widthRef.current?.value ? parseInt(widthRef.current.value) : undefined,
      heightRef.current?.value ? parseInt(heightRef.current.value) : undefined,
      borderRef.current?.value ? parseInt(borderRef.current.value) : undefined,
      bordercolorRef.current?.value,
      backgroundcolorRef.current?.value,
      params.id);
    toast.dismiss(toastId);
    router.push("/");
    router.refresh();
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const toastId = toast.loading("削除中です・・・");
    await deleteSquarebox(params.id);
    toast.dismiss(toastId);
    router.push("/");
    router.refresh();
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    getSquareboxById(params.id).then((data) => {
      if (topRef.current) {
        topRef.current.value = data.top;
      }
      if (leftRef.current) {
        leftRef.current.value = data.left;
      }
      if (widthRef.current) {
        widthRef.current.value = data.width;
      }
      if (heightRef.current) {
        heightRef.current.value = data.height;
      }
      if (borderRef.current) {
        borderRef.current.value = data.border;
      }
      if (bordercolorRef.current) {
        bordercolorRef.current.value = data.bordercolor;
      }
      if (backgroundcolorRef.current) {
        backgroundcolorRef.current.value = data.backgroundcolor;
      }
    }).catch((err) => {
      toast.error("エラーが発生しました。", { id: "1" })
    })
  }, []);

  return (
    <>
      <Toaster />
      <div className="w-1/4 m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-700 font-bold p-3">Edit Squarebox 🔥</p>
          <form>
            <label>
              top:
              <input
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
              />
            </label>
            <label>
              width:
              <input
                ref={widthRef}
                placeholder="width"
                type="number"
                className="rounded-md px-4 w-full py-2 my-2"
              />
            </label>
            <label>
              height:
              <input
                ref={heightRef}
                placeholder="height"
                type="number"
                className="rounded-md px-4 w-full py-2 my-2"
              />
            </label>
            <label>
              border:
              <input
                ref={borderRef}
                placeholder="border"
                type="number"
                className="rounded-md px-4 w-full py-2 my-2"
              />
            </label>
            <label>
              bordercolor:
              <input
                ref={bordercolorRef}
                placeholder="bordercolor"
                type="text"
                className="rounded-md px-4 w-full py-2 my-2"
              />
            </label>
            <label>
              backgroundcolor:
              <input
                ref={backgroundcolorRef}
                placeholder="backgroundcolor"
                type="text"
                className="rounded-md px-4 w-full py-2 my-2"
              />
            </label>
            <div className="flex flex-row-reverse w-full">
              <div>
                <button onClick={handleCancel} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-yellow-400 rounded-lg m-auto hover:bg-yellow-200">
                  Cancel
                </button>
              </div>
              <div>
                <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-200">
                  Delete
                </button>
              </div>
              <div>
                <button onClick={handleEdit} className="font-semibold px-4 py-2 shadow-xl bg-blue-400 rounded-lg m-auto hover:bg-blue-200">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditSquarebox
