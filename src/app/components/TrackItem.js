const TrackItem = ({ track }) => {
  return (
    <div className="font-medium flex flex-col w-32 select-none cursor-pointer">
      <img src={track.album.images[0].url} className="w-32 h-32" />
      <p className="text-sm mt-2 text-ellipsis overflow-hidden whitespace-nowrap">
        {track.name}
      </p>
      <p className="text-xs text-slate-400 text-ellipsis overflow-hidden whitespace-nowrap">
        {track.artists.map((artist, i) => (
          <span key={i}>
            {artist.name}
            {track.artists.length - 1 != i && " • "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TrackItem;
