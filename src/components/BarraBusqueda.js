import * as React from "react";
import { 
    Paper,
    InputBase,
    Divider,
    IconButton,
    TextField,
    MenuItem
 } from '@mui/material'
 import SearchIcon from "@mui/icons-material/Search";


const currencies = [
  {
    value: "todos_los_departamentos",
    label: "Todos"
  },
  {
    value: "computo_y_tabletas",
    label: "Computo y Tabletas"
  },
  {
    value: "television_y_video",
    label: "Televisión y Video"
  },
  {
    value: "audio_y_equipos_de_sonido",
    label: "Audio y Equipos de Sonido"
  }
];

export default function CustomizedInputBase() {

  const [currency, setCurrency] = React.useState("todos_los_departamentos");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{  display: "flex", alignItems: "center", width: 500 }}
    >
      <IconButton sx={{ p: "6px" }} aria-label="menu" >
        <div>
          <TextField
            id="standard-select-currency"
            select
            value={currency}
            onChange={handleChange}
            variant="standard"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar Producto"
        inputProps={{ "aria-label": "Buscar Producto" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" style={{backgroundColor:'#F0AD64', borderRadius:"0px" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
