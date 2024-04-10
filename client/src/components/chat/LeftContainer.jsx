import * as React from "react";
import SimpleContainer from "../common/SimpleContainer";
import UserList from "./UserList";
import Header from "../common/Header";

export default function LeftContainer({onItemClick}) {
  const handleItemClick = () => {
    // Call onItemClick function if it's a function
    if (typeof onItemClick === 'function') {
      console.log("LeftContainer: I got clicked");
      onItemClick();
    }
  };

  return (
    <>
      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <Header />
        <SimpleContainer backgroundColor="#cfe8fc" height="85vh">
          <UserList onItemClick={handleItemClick}/>
          <UserList onItemClick={handleItemClick}/>
          <UserList onItemClick={handleItemClick}/>
          <UserList onItemClick={handleItemClick}/>
        </SimpleContainer>
      </div>
    </>
  );
}
