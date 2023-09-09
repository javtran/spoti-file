import { getTopTracksMedium } from "@/spotify";
import { useEffect, useState } from "react";
import TrackItem from "./TrackItem";

const Tracks = () => {
  const [tracks, setTracks] = useState(null);
  const [selected, setSelected] = useState(0);

  const fetchTracks = async () => {
    const { data } = await getTopTracksMedium();
    setTracks(data);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const component = document.querySelector(".grid");
  let mx = 0;
  let downx = 0;

  const mousemoveHandler = (e) => {
    const mx2 = e.pageX - component.offsetLeft;
    if (mx) {
      component.scrollLeft = component.sx + mx - mx2;
    }
  };

  const mousedownHandler = (e) => {
    component.sx = component.scrollLeft;
    mx = e.pageX - component.offsetLeft;
    downx = e.pageX;
  };

  const mouseupHandler = () => {
    mx = 0;
  };

  const scrollHandler = (e) => {
    if (e.deltaY > 0) component.scrollLeft += 30;
    else component.scrollLeft -= 30;
    e.preventDefault();
  };

  if (component) {
    component.addEventListener("mousemove", mousemoveHandler);
    component.addEventListener("mousedown", mousedownHandler);
    component.addEventListener("mouseup", mouseupHandler);
    component.addEventListener("leave", mouseupHandler);
    component.addEventListener("wheel", scrollHandler);
  }

  const getDate = (string) => {
    const date = new Date(string);
    return date;
  };

  const getTime = (string) => {
    const date = new Date(string);
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return `${min ? min + " min" : ""} ${sec ? sec + " sec" : ""}`;
  };

  return (
    <div className="h-full flex flex-col justify-end">
      {tracks && (
        <div className=" p-8">
          <div className="flex gap-8">
            <img src={tracks.items[selected].album.images[1].url} />
            <div className="flex flex-col justify-end gap-2">
              <h1 className="text-6xl font-medium">
                {tracks.items[selected].name}
              </h1>
              <p className="text-slate-400">
                {tracks.items[selected].artists.map((artist, i) => (
                  <span key={i}>
                    {artist.name}
                    {tracks.items[selected].artists.length - 1 != i && ", "}
                  </span>
                ))}
                &nbsp;•{" "}
                {getDate(
                  tracks.items[selected].album.release_date
                ).getFullYear()}{" "}
                • {getTime(tracks.items[selected].duration_ms)}
              </p>
            </div>
          </div>
        </div>
      )}

      <ul className=" w-full bottom-0 grid gap-14 grid-flow-col bg-black py-6 px-6 cursor-grab overflow-y-hidden overflow-x-scroll scrollbar-none">
        {tracks &&
          tracks.items.map((track, i) => (
            <TrackItem
              track={{ ...track, rank: i }}
              key={i}
              setSelected={(e) => {
                if (e.pageX == downx) {
                  setSelected(i);
                }
              }}
              selected={selected}
            />
          ))}
      </ul>
    </div>
  );
};

export default Tracks;
