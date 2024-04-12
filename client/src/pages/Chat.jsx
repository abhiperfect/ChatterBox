import React, { useState, useRef, useEffect } from "react";
import LeftContainer from "../components/chat/LeftContainer.jsx";
import RightContainer from "../components/chat/RightContainer.jsx";
import ColumnsGrid from "../components/common/ColumnsGrid.jsx";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import axios from 'axios';


export default function Chat() {
  const [isRightContainerOpen, setIsRightContainerOpen] = useState(false);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600); // Assuming mobile view width as 600px
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender_id: "user1",
      message_text: "Hey there! How are you?",
      sent_at: "10:30 AM",
    },
    {
      id: 2,
      sender_id: "friend1",
      message_text: "I'm doing great, thanks for asking!",
      sent_at: "10:32 AM",
    },
    {
      id: 3,
      sender_id: "user1",
      message_text: "That's good to hear!",
      sent_at: "10:35 AM",
    },
    {
      id: 4,
      sender_id: "friend1",
      message_text: "How about you? How's everything going on your end?",
      sent_at: "10:40 AM",
    },
    {
      id: 5,
      sender_id: "user1",
      message_text: "Everything's going well. Just busy with work!",
      sent_at: "10:45 AM",
    },
    {
      id: 6,
      sender_id: "friend1",
      message_text: "I understand. Work can be hectic sometimes.",
      sent_at: "10:50 AM",
    },
    {
      id: 7,
      sender_id: "user1",
      message_text: "Yeah, definitely. How's your day going?",
      sent_at: "10:55 AM",
    },
    {
      id: 8,
      sender_id: "friend1",
      message_text: "It's going pretty well. Just relaxing at home.",
      sent_at: "11:00 AM",
    },
    {
      id: 9,
      sender_id: "user1",
      message_text: "Sounds nice! Enjoy your day.",
      sent_at: "11:05 AM",
    },
    {
      id: 10,
      sender_id: "friend1",
      message_text: "Thanks! You too.",
      sent_at: "11:10 AM",
    },
  ]);


  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/data');
        console.log("Server send data",response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const findById = (id) => {
    return messages.find((message) => message.id === id);
  };

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
    console.log(newMessage);
    // Additional logic to send message to server or handle messages as needed
  };
  const handleItemClick = (id) => {
    console.log('Chat got clicked: ', id);
   
    const message = findById(id); // Search for a message with id 3
    if (message) {
      console.log("Found message:", message);
    } else {
      console.log("Message not found");
    }
    setIsRightContainerOpen(true); // Toggle the state
  };

  // Update isMobileView state on window resize
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleToggle(value) {
    setIsRightContainerOpen(false);
  }

  return (
    <div className="mainContainer">
      <ColumnsGrid>
        {/* For mobile devices, the LeftContainer will take the full width */}
        <Grid item xs={12} sm={4}>
          <LeftContainer onItemClick={handleItemClick} handleMobileView={isMobileView}/>
        </Grid>
        {/* For laptops and larger screens, the LeftContainer will take 1/3 of the width */}
        <Grid
          item
          xs={12}
          sm={8}
          sx={{ position: isMobileView ? "absolute" : "static" , bottom:'0'}}
        >
          <RightContainer
            isOpen={isRightContainerOpen}
            handleSetToggleIsOpen={handleToggle}
            handleMobileView={isMobileView}

            messages={messages}
            handleSendMessage={handleSendMessage}
          />
        </Grid>
      </ColumnsGrid>
      <Footer borderBottomRightRadius="20px" borderBottomLeftRadius="20px" />
    </div>
  );
}
