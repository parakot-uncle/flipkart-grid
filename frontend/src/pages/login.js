import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
	const router = useRouter();
    function submitHandler(e) {
        e.preventDefault();
        setLoading(true)
        const user = {
            "email": email,
            "password": password
        }
        // localStorage.setItem("user", ...user)
        router.push('/chat')
        setLoading(false)
    }
    return (
		<div className="flex justify-center items-center w-[100vw] h-[100vh] flex-col ">
			<div id="title" className="font-bold text-3xl py-2 my-2">
				Login to StyleSpeak
			</div>
			<div className="flex flex-col my-2">
				<form action="" className="flex flex-col">
					<input
						type="email"
						placeholder="Email"
						className="px-3 py-2 rounded-sm text-lg my-2 w-96"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="px-3 py-2 rounded-sm text-lg my-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="bg-green-500 my-2 px-3 py-2 rounded-sm text-white text-lg w-full"
						onClick={submitHandler}
					>
						Login
					</button>
				</form>
			</div>
			<div className="my-2">
				Don't have an account?{" "}
				<Link href="/signup" className="text-green-500 underline">
					Sign up
				</Link>{" "}
				here
			</div>
		</div>
	);
}