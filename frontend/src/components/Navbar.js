import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faMessage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function Navbar(props) {
	const pathname = usePathname();
	const [showDropdown, setShowDropdown] = useState(false);
	return (
		<div className="w-full h-20 bg-[#9FA0FF] flex flex-row">
			{showDropdown && (
				<div className="absolute bg-white mt-[5.25rem] min-w-fit flex flex-col justify-center items-center rounded-md px-3 ml-[87%] ">
					<div className="py-2 cursor-pointer" onClick={() => {
						props.setShowOutfit(true)
						setShowDropdown(false)
					}}>
						View Current Outfit
					</div>
					<Link href={'/outfit'}>
						<div className="py-2 border-y-2 border-[#aaa]">View Previous Outfits</div>
					</Link>
					<Link href={'/'}>
						<div className="py-2 text-red-500">Sign Out</div>
					</Link>
				</div>
			)}
			<div className="flex justify-center items-center h-full text-3xl font-bold w-full">
				StyleSpeak
			</div>
			{pathname === "/chat" ? (
				<div className="flex justify-center items-center absolute ml-[92%] h-20 text-xl">
					<FontAwesomeIcon
						icon={faShirt}
						onClick={() => setShowDropdown(!showDropdown)}
						className="cursor-pointer"
					/>
				</div>
			) : (
				<div className="flex justify-center items-center absolute ml-[92%] h-20 text-xl pl-1">
					<Link href={"/chat"}>
						<FontAwesomeIcon icon={faMessage} />
					</Link>
				</div>
			)}
		</div>
	);
}
