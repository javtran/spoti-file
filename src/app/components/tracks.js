import { getTopTracksMedium } from "@/spotify";
import { useEffect, useState } from "react";
import TrackItem from "./TrackItem";

const Tracks = () => {
  const [tracks, setTracks] = useState(null);

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
    component.classList.add("dragging");
  };

  const mouseupHandler = () => {
    mx = 0;
    component.classList.remove("dragging");
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
    <div className="absolute w-screen bottom-0 grid gap-14 grid-flow-col bg-black py-6 px-6 cursor-grab overflow-y-hidden overflow-x-scroll scrollbar-none">
      {tracks &&
        tracks.items.map((track, i) => (
          <TrackItem track={{ ...track, rank: i }} key={i} />
        ))}
    </div>
  );
};

export default Tracks;
