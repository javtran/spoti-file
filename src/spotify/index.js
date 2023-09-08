import axios from "axios";

let token;
let hash;

if (typeof window === "object") {
  token = window.localStorage.getItem("token");
  hash = window.location.hash;
  window.location.hash = "";
}

if (!token && hash) {
  token = hash
    .substring(1)
    .split("&")
    .find((elem) => elem.startsWith("access_token"))
    .split("=")[1];
  window.localStorage.setItem("token", token);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const getUser = () =>
  axios.get("https://api.spotify.com/v1/me", { headers });

export const getTopTracksShort = () => {
  axios.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
    headers,
  });
};

export const getTopTracksMedium = () => {
  axios.get("https://api.spotify.com/v1/me/top/artists", { headers });
};

export const getTopTracksLong = () => {
  axios.get("https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
    headers,
  });
};
