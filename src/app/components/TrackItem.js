const TrackItem = ({ track, setSelected, selected }) => {
  return (
    <li
      className={
        "font-medium flex flex-col w-32 xl:w-40 p-2 xl:p-4 select-none cursor-pointer transform transition-all duration-200 " +
        (selected == track.rank && `bg-white`)
      }
      onMouseUp={setSelected}
    >
      <img src={track.album.images[0].url} className="w-full" />
      <p
        className={
          "text-sm mt-2 text-ellipsis overflow-hidden whitespace-nowrap " +
          (selected == track.rank && "text-black")
        }
      >
        {track.name}
      </p>
      <p className="text-xs text-slate-400 text-ellipsis overflow-hidden whitespace-nowrap">
        {track.artists.map((artist, i) => (
          <span key={i}>
            {artist.name}
            {track.artists.length - 1 != i && ", "}
          </span>
        ))}
      </p>
    </li>
  );
};

export default TrackItem;
