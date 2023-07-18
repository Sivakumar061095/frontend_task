import React, { useState } from "react";
import "./App.css";
import { Stack, TextField, Box, Slider } from "@mui/material";
import Forms from "./formdata.js";

const App = () => {
  const [value, setValue] = useState([0, 100]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
  };
  const handleInputChange = (e) => {
    const newValue = Number(e.target.value);

    if (e.target.placeholder === "Min") {
      if (newValue >= 0 && newValue < maxValue) {
        setMinValue(newValue);
        setValue([newValue, maxValue]);
      } else {
        setMinValue("");
        setValue([0, maxValue]);
        alert("minimum value cannot exceed maximum value");
      }
    } else {
      if (newValue > minValue && newValue <= 100) {
        setMaxValue(newValue);
        setValue([minValue, newValue]);
      } else {
        setMaxValue("");
        setValue([0, 0]);
        alert("maximum cannot be less than minimum or more than 100");
      }
    }
  };

  return (
    <>
      <Stack
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={2}
      >
        {Forms.map((form) => {
          return form.elementType === "input" ? (
            <Box>
              <TextField
                variant="standard"
                placeholder={form.placeholder}
                type={form.dataType}
                value={form.placeholder === "Min" ? minValue : maxValue}
                onChangeCapture={handleInputChange}
                label={form.label}
              />
            </Box>
          ) : (
            <Box sx={{ width: 200, border: 0 }}>
              <Slider
                value={value}
                step={2}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                aria-labelledby="range-slider"
              />
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default App;
