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
console.log();

export const getUser = () =>
  axios.get("https://api.spotify.com/v1/me", { headers });

export const getTopTracksShort = () =>
  axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
    headers,
  });
export const getTopTracksMedium = () =>
  axios.get("https://api.spotify.com/v1/me/top/tracks", { headers });

export const getTopTracksLong = () =>
  axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
    headers,
  });

export const getRecommendedTrack = (seed_track) =>
  axios.get(
    `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${seed_track}`,
    { headers }
  );
