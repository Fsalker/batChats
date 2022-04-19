import { useState, useEffect } from "react";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";

// TODO: Move in /utils.js
const fetcher = async ({ route }) => {
  const baseURL = `http://localhost:3000/`;
  const URL = `${baseURL}${route}`;

  try {
    const data = await (await fetch(URL)).json();
    return data;
  } catch (err) {
    console.log("Failed to fetch data", err);
  }
};

const getMessages = async () => {
  try {
    const messages = await fetcher({ route: "messages" });
    return messages;
  } catch (err) {
    return { error: err };
  }
};

function App() {
  const [messages, setMessages] = useState([]);

  const addNewMessage = (message) => {
    setMessages(messages.concat(message));
  };

  useEffect(() => {
    console.log(
      "Fetching messages.............................................."
    );
    const loadMessages = async () => {
      const messages = await getMessages();
      console.log(`messages -> `, messages);
      setMessages(messages);
    };
    loadMessages();
  }, []);

  return (
    <>
      <h1>Messages</h1>
      <MessageList messages={messages} setMessages={setMessages} />
      <MessageInput addNewMessage={addNewMessage} />
    </>
  );
}

export default App;
