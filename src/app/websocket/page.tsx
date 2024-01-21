"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function WebSocketTest() {

  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    console.log("WebSocket URL: " + `${process.env.WEBSOCKET_URL}` + '/websocket');
    const ws = new WebSocket(`${process.env.WEBSOCKET_URL}` + '/websocket');
    ws.onopen = () => {
      console.log('Connected to server');
    };

    ws.onmessage = (event) => {
      let data = JSON.parse(event.data)
      console.log(data.message);
      setMessage(data.message);
    };

    ws.onclose = () => {
      console.log('Disconnected from server');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    socket?.send(message);
  };

  return (
    <div className="w-3/4 m-auto h-screen flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-700 font-bold p-3">WebSocket TEST 💡</p>
        <div className="flex w-flex flex-row-reverse w-full mb-3">
          <Link
            href={"/"}
            className="px-4 py-1 rounded-md font-semibold bg-yellow-400 hover:bg-yellow-200"
          >
            Go Back
          </Link>
        </div>
        <hr className="w-80 h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700"/>
        <div className="flex flex-col justify-center items-center mt-10">
          <h1>Websocket Sample</h1>
          <input
            type="text"
            onChange={(event) => sendMessage(event.target.value)}
            placeholder="Enter message here"
          />
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}
