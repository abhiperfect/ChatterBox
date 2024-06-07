import * as React from "react";
import SimpleContainer from "../common/SimpleContainer";
import UserList from "./UserList";
import SearchBar from "../common/SearchBar";
import { backgroundColor } from "../../constants/color";

export default function LeftContainer() {
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
