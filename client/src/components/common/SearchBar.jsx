import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  searchBarBGColor,
  searchBarTextColor,
  searchBarInsetBoxShadow,
} from "../../constants/color";
import { useComponentContext } from "../../context/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import { Input } from "@mui/material";
import { useUserContext } from "../../context/UserContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
function SearchBar({
  borderTopLeftRadius,
  borderBottomLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
}) {
  const { setSearchBarOpen } = useComponentContext();

  const { setSearchQuery, allUserList } = useUserContext();

  const handleSearchClick = () => {
    setSearchBarOpen(true);
  };
  const closeSearchBar = () => {
    setSearchBarOpen(false);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <AppBar
      position="static"
      sx={{
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
        borderBottomRightRadius: borderBottomRightRadius,
        backgroundColor: searchBarBGColor,
        color: searchBarTextColor,
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Search
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
        <Input
          placeholder="Find Friends..."
          fullWidth={true}
          onChange={handleInputChange}
          onClick={handleSearchClick}
        ></Input>
        <CloseIcon onClick={closeSearchBar} sx={{ cursor: "pointer" }} />
      </Search>
    </AppBar>
  );
}

export default SearchBar;
