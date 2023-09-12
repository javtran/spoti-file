import { getAudioFeature, getRecommendedTrack } from "@/spotify";
import { useEffect, useState } from "react";

const TrackDetail = ({ track }) => {
  const [recommended, setRecommended] = useState(null);
  const [features, setFeatures] = useState(null);

  const fetchRecommended = async () => {
    setRecommended(null);
    const { data } = await getRecommendedTrack(track.id);
    setRecommended(data.tracks);
  };

  const fetchFeatures = async () => {
    setFeatures(null);
    const { data } = await getAudioFeature(track.id);
    setFeatures(data);
  };

  useEffect(() => {
    fetchRecommended();
    fetchFeatures();
  }, [track]);

  const getDate = (string) => {
    const date = new Date(string);
    return date;
  };

  const getTime = (ms) => {
    const date = new Date(ms);
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return [
      `${min ? min + " min" : ""} ${sec ? sec + " sec" : ""}`,
      `${min}:${sec < 10 ? "0" + sec : sec}`,
    ];
  };

  return (
    <div className="grow p-8 grid lg:grid-cols-2 overflow-auto">
      <div className="flex flex-col justify-between max-lg:order-last">
        <ul className="flex-1 flex flex-col mx-2">
          <li className="flex flex-1 justify-center">
            <span className="inline flex-1 border-r text-center align-middle">
              Acousticness
            </span>{" "}
            <span className="flex-1 text-center">50%</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Danceability</span>{" "}
            <span className="flex-1 border text-center">60%</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Energy</span>{" "}
            <span className="flex-1 border text-center">84%</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Instrumentalness</span>{" "}
            <span className="flex-1 border text-center">6%</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Liveness</span>{" "}
            <span className="flex-1 border text-center">8%</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Loudness</span>{" "}
            <span className="flex-1 border text-center">-5.883 db</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Modality</span>{" "}
            <span className="flex-1 border text-center">Minor</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Tempo</span>{" "}
            <span className="flex-1 border text-center">100BPM</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Time Signature</span>{" "}
            <span className="flex-1 border text-center">7/4</span>
          </li>
          <li className="flex flex-1">
            <span className="flex-1 border text-center">Valence</span>{" "}
            <span className="flex-1 border text-center">50%</span>
          </li>
        </ul>
        <div className="flex gap-8">
          <img
            src={track.album.images[1].url}
            className="max-lg:w-40 max-xl:w-56"
          />
          <div className="flex flex-col justify-end gap-2">
            <h1 className="max-xl:text-5xl text-6xl font-medium">
              {track.name}
            </h1>
            <p className="text-slate-400">
              {track.artists.map((artist, i) => (
                <span key={i}>
                  {artist.name}
                  {track.artists.length - 1 != i && ", "}
                </span>
              ))}
              &nbsp;• {track.album.name} •&nbsp;
              {getDate(track.album.release_date).getFullYear()}
              &nbsp;• {getTime(track.duration_ms)[0]}
            </p>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col overflow-auto">
        <h2 className="text-xl font-medium">
          Recommended base on this song and artist
        </h2>
        {recommended && (
          <ul className="p-6 flex flex-col gap-4">
            {recommended.map((track, i) => (
              <li className="flex text-sm items-center gap-4" key={i}>
                <p>{i + 1}</p>
                <img src={track.album.images[2].url} className="w-12" />
                <div className="flex-1 overflow-hidden whitespace-nowrap">
                  <p className="text-ellipsis overflow-hidden">{track.name}</p>
                  <p className="text-slate-400">
                    {track.artists.map((artist, i) => (
                      <span key={i}>
                        {artist.name}
                        {track.artists.length - 1 != i && ", "}
                      </span>
                    ))}
                  </p>
                </div>
                <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                  {track.album.name}
                </p>
                <p>{getTime(track.duration_ms)[1]}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TrackDetail;