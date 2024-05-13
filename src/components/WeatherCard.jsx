import PropTypes from "prop-types";
import useImage from "../customHook/useImage"; // Import the custom hook

const WeatherCard = ({ day }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dt = new Date(day.dt_txt);
  const dayIndex = dt.getDay();
  const celsiusTemp = (day.main.temp - 273.15).toFixed(2);

  // Get the image URL based on the weather description
  const imageUrl = useImage(day.weather[0].description);

  return (
    <div>
      <p>{daysOfWeek[dayIndex]}</p>
      <img
        src={imageUrl}
        alt={day.weather[0].description}
        height="45"
        width="100"
      />
      <p>
        {celsiusTemp}
        <sup>°C</sup>
      </p>
      {/* <p>{day.weather[0].description}</p> */}
    </div>
  );
};

WeatherCard.propTypes = {
  day: PropTypes.object.isRequired,
};

export default WeatherCard;
