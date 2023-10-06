import { getTopTracksMedium } from "@/spotify";
import { useEffect, useState } from "react";
import TrackItem from "./TrackItem";
import TrackDetail from "./TrackDetail";
import NavBar from "./NavBar";

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

  const component = document.querySelector("#scrollbar");
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
    // e.preventDefault();
  };

  const rightHandler = (e) => {
    let x = component.clientWidth / 2 + component.scrollLeft + 0;
    component.scroll({
      left: x,
      behavior: "smooth",
    });
  };

  const leftHandler = (e) => {
    let x = component.clientWidth / 2 - component.scrollLeft + 0;
    component.scroll({
      left: -x,
      behavior: "smooth",
    });
  };

  if (component && !component.hasAttribute("load")) {
    component.addEventListener("mousemove", mousemoveHandler);
    component.addEventListener("mousedown", mousedownHandler);
    component.addEventListener("mouseup", mouseupHandler);
    component.addEventListener("leave", mouseupHandler);
    component.addEventListener("wheel", scrollHandler);
    component.setAttribute("load", true);
  }

  return (
    <div className="flex flex-col h-full">
      <NavBar></NavBar>
      {tracks && <TrackDetail track={tracks.items[selected]}></TrackDetail>}

      <div className="bg-black">
        {tracks && (
          <div className="p-2 pr-4 pb-0 flex justify-between items-center select-none">
            <span className="text-xl font-medium">Top Tracks</span>
            <div className="flex gap-8">
              <img
                src="leftarrow.png"
                className="invert h-4 cursor-pointer"
                onClick={leftHandler}
              />
              <img
                src="rightarrow.png"
                className="invert h-4 cursor-pointer"
                onClick={rightHandler}
              />
            </div>
          </div>
        )}

        <ul
          className="grid gap-8 xl:gap-10 grid-flow-col p-2 cursor-grab overflow-y-hidden overflow-x-scroll scrollbar-none"
          id="scrollbar"
        >
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
    </div>
  );
};

export default Tracks;
