import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import Highlights from "./Highlights";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Fab from "@mui/material/Fab";

import WeatherView from "./WeatherView";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [cardData, setCardData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const boxRef = useRef(null);
  const gridRef = useRef(null);
  const [boxHeight, setBoxHeight] = useState("100vh");

  const [value, setValue] = React.useState(2);

  const tabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (boxRef.current) {
      setBoxHeight(boxRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.height = `${boxHeight}px`;
    }
  }, [boxHeight]);

  const apiKey = "b027c5ece8a460fd7953e5483c01f747";

  const fetchCardData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      let lon = response.data.coord.lon;
      let lat = response.data.coord.lat;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        console.log(" weather data : ", response.data);
        setWeatherData(response.data);
        const uniqueDates = new Set();
        const uniqueData = [];

        response.data.list.forEach((item) => {
          const dt_txt = item.dt_txt.split(" ")[0];
          if (!uniqueDates.has(dt_txt)) {
            uniqueDates.add(dt_txt);
            uniqueData.push(item);
          }
        });

        console.log("uniqueData", uniqueData);
        setCardData(uniqueData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      setError("City not found");
    }
  };

  const handleClose = () => {
    setError(null);
  };

  const handleChange = (e) => {
    setCardData(null);
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCardData();
  };

  return (
    <Box
      ref={boxRef}
      sx={{ flexGrow: 1, justifyContent: "center", height: "85vh" }}
    >
      <Grid ref={gridRef} container spacing={2}>
        <Grid item xs={3}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
              padding: "2vh",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="standard-basic"
              label="🔍  Search city here ... "
              variant="standard"
              value={city}
              onChange={handleChange}
            />
          </Box>
          <Grid>{weatherData && <WeatherView data={weatherData} />}</Grid>
        </Grid>

        <Grid
          item
          xs={9}
          style={{
            background: "whiteSmoke",
            padding: "2vh",
            borderTopRightRadius: "5vh",
            borderBottomRightRadius: "5vh",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Tabs
              value={value}
              onChange={tabChange}
              aria-label="disabled tabs example"
              sx={{ color: "black" }}
            >
              <Tab label="Today" disabled />
              <Tab label="Week" />
            </Tabs>
            <div
              style={{
                marginRight: "20px",
              }}
            >
              <Fab
                variant="extended"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  marginRight: "10px",
                }}
              >
                °C
              </Fab>
              <Fab variant="extended">°F</Fab>
            </div>
          </div>
          <Grid
            container
            spacing={1}
            style={{
              justifyContent: "center",
            }}
          >
            {cardData &&
              cardData.map((day, index) => (
                <Grid
                  item
                  key={index}
                  style={{
                    width: "100px",
                    height: "150px",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    textAlign: "center",
                    borderRadius: "2vh",
                    margin: "2vh",
                    background: "white",
                    paddingLeft: "0px",
                  }}
                >
                  <WeatherCard day={day} />
                </Grid>
              ))}
          </Grid>
          <Grid>{weatherData && <Highlights data={weatherData} />}</Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {error}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default WeatherSearch;
