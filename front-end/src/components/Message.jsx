import userIcon from "./userIcon.png";
import "./Message.css";

// TODO: Use TS to create messageType
export const Message = ({ message }) => {
  return (
    <div className="messageContainer">
      <img src={userIcon} alt="Author's Icon" className="message" />
      &nbsp;<strong>{message?.author?.name}:</strong>&nbsp;{message?.message}
    </div>
  );
};
