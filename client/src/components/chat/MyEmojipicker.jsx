import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function MyEmojiPicker({ selectedEmoji }) {
  const [chosenEmoji, setChosenEmoji] = useState("");

  const emojiPickerFunction = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setChosenEmoji(emoji);
    selectedEmoji(emoji); // Call the selectedEmoji function with the chosen emoji
  };

  return (
    <div>
      <EmojiPicker
        onEmojiClick={emojiPickerFunction}
        style={{ position: "absolute" }}
      />
    </div>
  );
}

export default MyEmojiPicker;
