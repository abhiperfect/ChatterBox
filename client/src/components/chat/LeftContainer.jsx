import * as React from "react";
import SimpleContainer from "../common/SimpleContainer";
import UserList from "./UserList";
import Header from "../common/Header";
import SearchBar from "../common/SearchBar";


export default function LeftContainer({onItemClick}) {
  const handleItemClick = (id) => {
    // Call onItemClick function if it's a function
    console.log('LeftContainer got clicked: ', id);
    if (typeof onItemClick === 'function') {
      onItemClick(id);
    }
  };

  return (
    <>
      <div style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <SearchBar borderTopLeftRadius='20px'/>
        <SimpleContainer backgroundColor="#cfe8fc" height="73vh" cursor='pointer'>
          <UserList onItemClick={handleItemClick}/>
          <UserList onItemClick={handleItemClick}/>
          <UserList onItemClick={handleItemClick}/>
          <UserList onItemClick={handleItemClick}/>
        </SimpleContainer>
      </div>
    </>
  );
}
