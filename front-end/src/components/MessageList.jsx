import { useState } from "react";
import { Message } from "./Message";

export const MessageList = ({ messages }) => {
  // TODO: Use React Suspense in order to display a nice loading spinner :D
  // const [isLoading, setLoading] = useState(false);

  const Messages = messages.map((message) => (
    <Message key={`key-message-${message.ID}`} message={message} />
  ));
  return <div>{Messages}</div>;
};
