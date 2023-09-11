import { getTopTracksMedium } from "@/spotify";
import { useEffect, useState } from "react";
import TrackItem from "./TrackItem";
import TrackDetail from "./TrackDetail";

const Tracks = () => {
  const [tracks, setTracks] = useState(null);
  const [selected, setSelected] = useState(0);
  const [downx, setDownx] = useState(0);

  const fetchTracks = async () => {
    const { data } = await getTopTracksMedium();
    setTracks(data);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const component = document.querySelector(".grid");
  let mx = 0;

  const mousemoveHandler = (e) => {
    const mx2 = e.pageX - component.offsetLeft;
    if (mx) {
      component.scrollLeft = component.sx + mx - mx2;
    }
  };

  const mousedownHandler = (e) => {
    component.sx = component.scrollLeft;
    mx = e.pageX - component.offsetLeft;
    setDownx(e.pageX);
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

  return (
    <div className="flex flex-col h-full">
      {tracks && <TrackDetail track={tracks.items[selected]}></TrackDetail>}

      <ul className="shrink-0 w-full grid gap-8 xl:gap-10 grid-flow-col bg-black p-2 cursor-grab overflow-y-hidden overflow-x-scroll scrollbar-none">
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
