import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import cityBg from "../assets/city_img.jpg";

import useImage from "../customHook/useImage";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const WeatherView = ({ data }) => {
  // Extracting necessary data
  const { city, list } = data;
  const { name } = city;
  const { dt_txt, main, weather } = list[0];
  const { temp, humidity } = main;
  const { description } = weather[0];

  // Formatting date and time
  const date = new Date(dt_txt);
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const time = date.toLocaleTimeString();

  // Converting temperature to Celsius
  // const celsiusTemp = (temp - 273.15).toFixed(2);
  const celsiusTemp = Math.floor(temp - 273.15);

  const imageUrl = useImage(description);

  // capitalize description
  const capitalizedDescription = description
    .split(" ")
    .map(capitalizeFirstLetter)
    .join(" ");

  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: "30px", justifyContent: "center", alignItems: "center" }}
    >
      <Grid item xs={12}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="weather-icon"
            style={{ height: "150px", width: "100%" }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "3.2em", fontFamily: "Courier New" }}>
          {" "}
          {celsiusTemp}
          <sup>°C</sup>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ borderBottom: "1px solid black" }}>
          {day}, <span style={{ color: "grey" }}>{time}</span>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography> ☁️ {capitalizedDescription}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>☔️ {humidity}%</Typography>
      </Grid>
      <Grid item xs={12} style={{ position: "relative", textAlign: "center" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          <Typography variant="body1">{name}</Typography>
        </div>
        <img
          src={cityBg}
          alt="weather-icon"
          style={{
            height: "100px",
            width: "90%",
            objectFit: "cover",
            borderRadius: "2vh",
            color: "white",
          }}
        />
      </Grid>
    </Grid>
  );
};

WeatherView.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt_txt: PropTypes.string.isRequired,
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired,
          humidity: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default WeatherView;
