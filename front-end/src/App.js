import { useState, useEffect } from "react";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";

const CHATROOM_ID_HARDCODED =
  "6262d9ccf1c5f1f53e4b07936262d9ccf1c5f1f53e4b0794";
const AUTHOR_ID_HARDCODED = "6262d9ccf1c5f1f53e4b0793";

// TODO: Move in /utils.js
const fetcher = async ({ route, body, method = "GET" }) => {
  const baseURL = `http://localhost:3000/`;
  const URL = `${baseURL}${route}`;

  try {
    console.log(`BODY = `, body);
    const data = await (
      await fetch(URL, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    return data;
  } catch (err) {
    console.log("Failed to fetch data", err);
  }
};

const getMessages = async ({ chatroomId }) => {
  try {
    const messages = await fetcher({ route: `messages/${chatroomId}` });
    return messages;
  } catch (err) {
    return { error: err };
  }
};

const postMessage = async ({ chatroomId, authorId, messageValue }) => {
  try {
    const message = await fetcher({
      route: `messages/${chatroomId}`,
      method: "POST",
      body: {
        chatroomId,
        authorId,
        message: messageValue,
      },
    });
    return message;
  } catch (err) {
    return { error: err };
  }
};

function App() {
  const [messages, setMessages] = useState([]);

  const addNewMessage = async (messageValue) => {
    const message = await postMessage({
      chatroomId: CHATROOM_ID_HARDCODED,
      authorId: AUTHOR_ID_HARDCODED,
      messageValue,
    });

    setMessages(messages.concat(message));
    // TODO: Pop a Snackbar if this request fails
    // TODO v2: Pop a GENERIC Snackbar if ANY request fails
  };

  useEffect(() => {
    console.log(
      "Fetching messages.............................................."
    );
    const loadMessages = async () => {
      const messages = await getMessages({ chatroomId: CHATROOM_ID_HARDCODED });
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
