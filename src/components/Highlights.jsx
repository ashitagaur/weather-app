import PropTypes from "prop-types";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import "./highlights.css";
import uv from "../assets/uv.png";

function convertUnixTimestamp(unixTimestamp) {
  // Create a new Date object with the Unix timestamp in milliseconds
  let date = new Date(unixTimestamp * 1000);

  // Get the hours, minutes, and seconds
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Convert hours to AM/PM format
  let meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Add leading zeros to minutes and seconds if they're single digits
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Return the formatted time string
  return hours + ":" + minutes + ":" + seconds + " " + meridiem;
}
const Highlights = ({ data }) => {
  console.log(data);

  // Extracting necessary data
  const { sunset, sunrise } = data.city;
  const sunriseTime = convertUnixTimestamp(sunrise);
  const sunsetTime = convertUnixTimestamp(sunset);
  const todaysData = data.list[0];
  const visibility = todaysData.visibility;
  const humidity = todaysData.main.humidity;
  const pressure = todaysData.main.pressure;

  const windSpeed = todaysData.wind.speed;
  console.log(
    sunriseTime,
    sunsetTime,
    visibility,
    humidity,
    windSpeed,
    pressure
  );
  return (
    <Grid container spacing={2} className="highlights">
      <Grid item xs={12} sm={6} md={4}>
        <Card className="card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="heading">
              UV index
            </Typography>
            <img
              src={uv}
              alt="weather-icon"
              style={{
                height: "100px",
                width: "90%",
              }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="heading">
              Wind Status
            </Typography>
            <Typography className="value">{windSpeed} km/h</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="heading">
              Sunrise & Sunset
            </Typography>
            <Typography className="suncardValue"> ⬆️ {sunriseTime}</Typography>
            <Typography className="suncardValue"> ⬇️ {sunsetTime}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card className="card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="heading">
              Humidity
            </Typography>
            <Typography className="value">{humidity}%</Typography>
            <Typography> Nomral 🤙🏻 </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="heading">
              Visibility
            </Typography>
            <Typography className="value">{visibility} km</Typography>
            <Typography> Average 🙁 </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="heading">
              Air Quality
            </Typography>
            <Typography className="value">{pressure}</Typography>
            <Typography> Unhealthy 👎🏻 </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Highlights.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Highlights;
