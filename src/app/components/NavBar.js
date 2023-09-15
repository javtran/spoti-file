import { getUser, logout } from "@/spotify";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [profileToggle, setProfileToggle] = useState(false);

  const toggleProfile = () => {
    setProfileToggle(!profileToggle);
  };

  const fetchUser = async () => {
    const { data } = await getUser();
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    user && (
      <div className="flex justify-end pt-4 pr-4">
        <div className="relative select-none cursor-pointer max-md:text-sm">
          <div
            className={
              "flex gap-3 items-center px-2 py-1 hover:bg-black rounded-full transform transition-all duration-100 select-none cursor-pointer " +
              (profileToggle && "bg-black")
            }
            onClick={toggleProfile}
          >
            <img
              src={user.images[1].url}
              alt={user.display_name + "'s display name"}
              className="w-6 h-6 md:w-10 md:h-10 object-cover rounded-full"
            />
            <span className="font-medium max-md:text-sm">
              {user.display_name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
              fill="#fff"
            >
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          </div>
          <div
            className="absolute bg-black w-full text-center py-2 rounded mt-2 z-10"
            hidden={!profileToggle}
            onClick={logout}
          >
            Log out
          </div>
        </div>
      </div>
    )
  );
};

export default NavBar;
