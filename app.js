// YOUR JS CODE HERE

const getWeather = async () => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1"
  );
  return await res.json();
};

const updateUI = async () => {
  try {
    const data = await getWeather();
    document.getElementById("loading").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById(
      "temp"
    ).innerHTML = `${data.current.temperature_2m} ${data.current_units.temperature_2m}`;
    document.getElementById(
      "speed"
    ).textContent = `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;
    document.getElementById("timezone").textContent = data.timezone;
    document.getElementById("time").textContent = new Date(
      data.current.time
    ).toLocaleString(data.timezone_abbreviation, { localeMatcher: "lookup" });
  } catch (err) {
    console.log(err);
    document.getElementById("loading").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("loading").textContent = "Failed fetching weather!";
  }
};

updateUI();
