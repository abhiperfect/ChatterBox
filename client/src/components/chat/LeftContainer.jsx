import * as React from "react";
import SimpleContainer from "../common/SimpleContainer";
import UserList from "./UserList";
import SearchBar from "../common/SearchBar";
import { backgroundColor } from "../../constants/color";

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
        <SimpleContainer backgroundColor={backgroundColor} height="73vh" cursor='pointer'>
          <UserList/>
        </SimpleContainer>
      </div>
    </>
  );
}
