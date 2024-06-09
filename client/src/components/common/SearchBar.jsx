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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchBar({
  borderTopLeftRadius,
  borderBottomLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
}) {
  const { searchBarOpen, setSearchBarOpen } = useComponentContext();
  const [searchInput, setSearchInput] = useState("");
  const searchBarRef = useRef(null);

  const handleSearchClick = () => {
    setSearchBarOpen(true);
  };
  const closeSearchBar = () => {
    setSearchBarOpen(false);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
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
        <CloseIcon onClick={closeSearchBar} sx={{ cursor:'pointer' }} />
      </Search>
    </AppBar>
  );
}

export default SearchBar;
