import { getUser } from "@/spotify";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUser();
      setUser(data);
    };
    fetchUser();
  }, []);
  return (
    user && (
      <div className="flex gap-8">
        <img
          src={user.images[1].url}
          alt={user.display_name + "'s display name"}
          className="w-60 h-60 object-cover rounded-full"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm tracking-tight font-medium">Your Spoti-file</p>
          <h1 className="text-9xl font-semibold">{user.display_name}</h1>
        </div>
      </div>
    )
  );
};

export default Profile;
