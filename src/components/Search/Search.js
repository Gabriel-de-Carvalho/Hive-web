import React from "react";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Search.css";

function Search() {
  return (
    <div className="search-main">
      <div className="search-bar-main">
        <TextField
          id="standard-basic"
          label="Busque aqui ótimas oportunidades"
          variant="standard"
          fullWidth
        />
      </div>
      <div className="button-group-search">
        <Stack spacing={2} direction="row">
          <Button variant="contained">Contained</Button>
          <Button variant="contained">Contained</Button>
        </Stack>
      </div>
    </div>
  );
}

export default Search;
