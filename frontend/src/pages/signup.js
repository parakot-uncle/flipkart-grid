import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown, faAngleUp
} from "@fortawesome/free-solid-svg-icons";
import { ClapSpinner } from "react-spinners-kit";
import { useRouter } from "next/router";

export default function Signup(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('Set Gender')
    const [dropdown, setDropdown] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    function submitHandler(e){
        e.preventDefault();
        setLoading(true)
        if(password===confirmPassword && gender!=="Set Gender"){
            const output = {
				"email": email,
				"password": password,
                "gender": gender
			};
            console.log(output)
            router.push("/login");
        }
        else{
            setConfirmPassword('')
        }
        
        setLoading(false)
        
    }
    return (
		<div className="flex justify-center items-center w-[100vw] h-[100vh] flex-col ">
			<div className="absolute ml-[48%] mt-[17%] z-10">
				<ClapSpinner loading={loading} />
			</div>
			<div id="title" className="font-bold text-3xl py-2 my-2">
				Signup to StyleSpeak
			</div>
			<div className="flex flex-col my-2">
				<form action="" className="flex flex-col">
					<input
						type="email"
						placeholder="Email"
						className="px-3 py-2 rounded-sm text-lg my-2 w-96"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<input
						type="password"
						placeholder="Password"
						className="px-3 py-2 rounded-sm text-lg my-2"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						className="px-3 py-2 rounded-sm text-lg my-2"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
					/>
					<div className="w-96 relative">
						<div
							className={`px-3 py-2 ${
								gender === "Set Gender"
									? "text-[#aaa]"
									: "text-black"
							} bg-white my-2 text-lg rounded-sm flex flex-row`}
						>
							<div>{gender}</div>
							<div
								className="ml-auto text-[#666] cursor-pointer"
								onClick={() => {
									setDropdown(!dropdown);
								}}
							>
								{dropdown ? (
									<FontAwesomeIcon icon={faAngleUp} />
								) : (
									<FontAwesomeIcon icon={faAngleDown} />
								)}
							</div>
						</div>
						{dropdown && (
							<div className="flex flex-col  bg-white z-10 absolute w-full justify-center items-center">
								<div
									className="py-2 cursor-pointer hover:bg-[#ccc] transition-all duration-200 w-full text-center rounded-sm"
									onClick={() => {
										setGender("Man");
										setDropdown(false);
									}}
								>
									Man
								</div>
								<div
									className="py-2 border-t-2 border-[#aaa] w-full text-center rounded-sm cursor-pointer hover:bg-[#ccc] transition-all duration-200"
									onClick={() => {
										setGender("Woman");
										setDropdown(false);
									}}
								>
									Woman
								</div>
							</div>
						)}
						<button className="bg-green-500 my-2 px-3 py-2 rounded-sm text-white text-lg w-full" onClick={submitHandler}>
							Sign Up
						</button>
					</div>
				</form>
			</div>
			<div className="my-2">
				Already have an account?{" "}
				<Link href="/login" className="text-green-500 underline">
					Login
				</Link>{" "}
				here
			</div>
		</div>
	);
}