import { getAudioFeature, getRecommendedTrack } from "@/spotify";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const key_list = {
  0: "C",
  1: "C♯/D♭",
  2: "D",
  3: "D♯/E♭",
  4: "E",
  5: "F",
  6: "F♯/G♭",
  7: "G",
  8: "G♯/A♭",
  9: "A",
  10: "A♯/B♭",
  11: "B",
};

const TrackDetail = ({ track }) => {
  // console.log(track);
  const [recommended, setRecommended] = useState(null);
  const [mainFeatures, setMainFeatures] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  const fetchRecommended = async () => {
    setRecommended(null);
    const { data } = await getRecommendedTrack(track.id);
    setRecommended(data.tracks);
  };

  const fetchFeatures = async () => {
    setMainFeatures(null);
    setAudioFeatures(null);
    const { data } = await getAudioFeature(track.id);
    setAudioFeatures({
      acousticness: data.acousticness,
      danceability: data.danceability,
      energy: data.energy,
      instrumentalness: data.instrumentalness,
      liveness: data.liveness,
      speechiness: data.speechiness,
      valence: data.valence,
    });
    setMainFeatures({
      key: `${key_list[data.key]} ${data.modality ? "Major" : "Minor"}`,
      tempo: Math.round(data.tempo),
      loudness: `${Math.round(data.loudness)} dB`,
      "time signature": `${data.time_signature}/4`,
    });
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
    <div className="relative grow p-4 grid gap-8 lg:grid-cols-2 overflow-auto">
      <div className="flex flex-col gap-8 h-full">
        <div className="flex gap-8 w-full">
          <img
            src={track.album.images[1].url}
            className="max-md:h-28 max-lg:h-40 max-xl:h-56"
          />
          <div className="flex flex-col">
            <a
              href={track.external_urls.spotify}
              target="_blank"
              className="max-sm:text-xl max-md:text-2xl max-lg:text-3xl max-xl:text-4xl text-5xl font-medium line-clamp-3 pb-[0.2em] hover:underline"
            >
              {track.name}
            </a>
            <p className="text-slate-400">
              {track.artists.map((artist, i) => (
                <a
                  key={i}
                  href={artist.external_urls.spotify}
                  target="_blank"
                  className="hover:underline"
                >
                  {artist.name}
                  {track.artists.length - 1 != i && ", "}
                </a>
              ))}
              &nbsp;•{" "}
              <a
                href={track.album.external_urls.spotify}
                target="_blank"
                className="hover:underline"
              >
                {track.album.name}
              </a>{" "}
              •&nbsp;
              {getDate(track.album.release_date).getFullYear()}
              &nbsp;• {getTime(track.duration_ms)[0]}
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 w-full gap-4">
          {mainFeatures &&
            Object.keys(mainFeatures).map((feat) => (
              <li
                key={feat}
                className="flex flex-col p-2 md:p-4 items-center justify-center bg-stone-800 drop-shadow-md"
              >
                <span className="text-xl md:text-3xl text-center">
                  {mainFeatures[feat]}
                </span>
                <span className="text-slate-400 text-xs md:text-sm capitalize">
                  {feat}
                </span>
              </li>
            ))}
        </ul>
        <ul className="flex flex-col gap-8">
          {mainFeatures &&
            Object.keys(audioFeatures).map((feat, i) => (
              <li key={feat}>
                <ProgressBar
                  feature={feat}
                  score={audioFeatures[feat]}
                  i={i}
                ></ProgressBar>
              </li>
            ))}
        </ul>
      </div>

      {recommended && (
        <div className="h-fit overflow-auto">
          <h2 className="text-xl font-medium">
            Recommended base on this song and artist
          </h2>
          <ul className=" flex flex-col lg:gap-2 mt-2">
            {recommended.map((track, i) => (
              <li key={i}>
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  className="flex text-sm items-center gap-4 p-2 px-4 hover:bg-stone-800 rounded"
                >
                  <p className="w-4 text-center">{i + 1}</p>
                  <img src={track.album.images[2].url} className="w-12" />
                  <div className="flex-1 overflow-hidden whitespace-nowrap">
                    <p className="text-ellipsis overflow-hidden">
                      {track.name}
                    </p>
                    <p className="text-slate-400 text-ellipsis overflow-hidden">
                      {track.artists.map((artist, i) => (
                        <span key={i}>
                          {artist.name}
                          {track.artists.length - 1 != i && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap max-xl:hidden">
                    {track.album.name}
                  </p>
                  <p>{getTime(track.duration_ms)[1]}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackDetail;
