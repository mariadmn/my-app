import axios from "axios";

export const openWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: { appid: '8d3b84bd38e936c4c5fbc9e1c6094240'},
});