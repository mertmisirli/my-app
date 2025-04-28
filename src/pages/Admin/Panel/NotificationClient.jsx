import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

function NotificationClient() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7254/notificationHub") // SignalR Hub URL
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    connection
      .start()
      .then(() => console.log("SignalR connected."))
      .catch((err) => console.error("Connection error: ", err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📢 Bildirimler</h2>
      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx} className="bg-blue-100 p-2 rounded shadow-sm">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationClient;
