import React, { useState } from "react";
// import Sidebar from "../../layout/sidebar/Sidebar";

interface Message {
  id: number;
  sender: string;
  subject: string;
  date: string;
  message: string;
  read?: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "HostelEase Admin",
    subject: "Maintenance Request",
    date: "2024-07-05",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    read: false,
  },
  {
    id: 2,
    sender: "Booking System",
    subject: "New Booking",
    date: "2024-07-04",
    message:
      "Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    read: false,
  },
];

const Inbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const readMessage = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, read: true } : message
      )
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-screen-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
          Inbox
        </h2>
        <div className="overflow-hidden">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`border-b border-gray-200 mb-4 p-4 cursor-pointer ${
                message.read ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => readMessage(message.id)}
            >
              <div className="flex justify-between">
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-bold">{message.sender}</span> |{" "}
                  {message.date}
                </div>
                {!message.read && (
                  <span className="text-xs text-red-500 font-bold">New</span>
                )}
              </div>
              <div className="text-lg font-bold mb-2">{message.subject}</div>
              <div className="text-gray-800">{message.message}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
