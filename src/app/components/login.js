import Link from "next/link";

const Login = () => {
    return (
        <div>
            <Link className="border p-4" href={"http://localhost:8000/login"}>
                Login to Spotify
            </Link>
        </div>
    );
};

export default Login;
