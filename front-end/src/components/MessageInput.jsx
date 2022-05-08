import { useState } from "react";

export const MessageInput = ({ addNewMessage }) => {
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessage = () => {
    addNewMessage(value);
    // addNewMessage({
    //   ID: Math.floor(Math.random() * 65536),
    //   createdAt: new Date().getTime(),
    //   message: value,
    //   author: {
    //     ID: 1250,
    //     name: "Andrei Puiu (in-browser)",
    //     icon: "userIcon.png",
    //   },
    // });
    setValue("");
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a new message..."
      />
      <button onClick={() => sendMessage()}>Send Message</button>
    </div>
  );
};
