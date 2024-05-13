import WeatherSearch from "./components/WeatherSearch";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        flexWrap: "nowrap",
        background: "white",
        margin: "10vh",
        borderRadius: "5vh",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        height: "85vh",
      }}
    >
      <WeatherSearch />
    </Box>
  );
};

export default App;
