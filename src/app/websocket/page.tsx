"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function WebSocketTest() {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    console.log("WebSocket URL: " + `${process.env.WEBSOCKET_URL}` + '/websocket');
    let ws: WebSocket;
    let timer: NodeJS.Timeout;
  
    const connect = () => {
      ws = new WebSocket(`${process.env.WEBSOCKET_URL}` + '/websocket');
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
        timer = setTimeout(() => {
          connect();
        }, 1000);
      };
      setSocket(ws);
    }
    connect();
  
    return () => {
      clearTimeout(timer);
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
          <br />
          <p>入力した文字列をFastAPIに送信してその文字列をエコーバックしてくれます。</p>
          <br />
          <p>テストする際には、ローカルホストで試して下さい。</p>
          <p>※VercelがWebSocketサービスを提供していないため</p>
          <br />
          <p>api-testプロジェクトに移動して以下コマンドを実行</p>
          <p>$ npm run dev</p>
          <br />
          <p>fastapi-testプロジェクトに移動して以下コマンドを実行</p>
          <p>$ python -m uvicorn main:app --reload</p>
          <br />
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
