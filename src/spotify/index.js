import axios from "axios";
import { useEffect, useState } from "react";

let headers;
const EXPIRATION_TIME = 3600 * 1000;
const getLocalAccessToken = () => window.localStorage.getItem("access_token");
const getLocalRefreshToken = () => window.localStorage.getItem("refresh_token");
const getLocalTokenTimestamp = () =>
  window.localStorage.getItem("token_timestamp");
const setLocalAccessToken = (token) => {
  window.localStorage.setItem("token_timestamp", Date.now());
  window.localStorage.setItem("access_token", token);
};
const setLocalRefreshToken = (token) => {
  window.localStorage.setItem("refresh_token", token);
};

const setHeaders = (token) => {
  headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const logout = () => {
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
  window.localStorage.removeItem("token_timestamp");
  window.location.reload();
};
const refreshAccessToken = (refreshToken) => {
  axios
    .post("http://localhost:8000/refresh", {
      refreshToken,
    })
    .then((res) => {
      setLocalAccessToken(res.data.accessToken);
      window.location.reload();
    })
    .catch((e) => {
      console.error(e);
    });
};

export default function getToken() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const code = new URLSearchParams(window.location.search).get("code");
  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();
  const localTokenTimestamp = getLocalTokenTimestamp();

  useEffect(() => {
    setHeaders(localAccessToken);
    setAccessToken(localAccessToken);
    setRefreshToken(localRefreshToken);
  }, []);

  useEffect(() => {
    if (code) {
      axios
        .post("http://localhost:8000/token", {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setLocalAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setLocalRefreshToken(res.data.refreshToken);
          setHeaders(res.data.accessToken);

          window.history.pushState({}, null, "/");
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken) return;

    if (Date.now() - localTokenTimestamp > EXPIRATION_TIME) {
      refreshAccessToken(refreshToken);
    } else {
      setTimeout(() => {
        refreshAccessToken(refreshToken);
      }, EXPIRATION_TIME - localTokenTimestamp);
    }
    const interval = setInterval(() => {
      refreshAccessToken(refreshToken);
    }, EXPIRATION_TIME - 100);

    return () => clearInterval(interval);
  }, [refreshToken]);

  return accessToken;
}

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

export const getAudioFeature = (track_id) =>
  axios.get(`https://api.spotify.com/v1/audio-features/${track_id}`, {
    headers,
  });
