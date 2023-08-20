import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPaperPlane,
	faMars,
	faVenus,
	faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import EditModal from "@/components/Modal";

export default function chat() {
	const [query, setQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [product, setProduct] = useState({});
	const [outfit, setOutfit] = useState({
		topwear: {},
		bottomwear: {},
		shoes: {},
	});
	const [showOutfit, setShowOutfit] = useState(false);
	const textareaRef = useRef();
	const finalRef = useRef();
	const [conversation, setConversation] = useState([
		{
			user: true,
			message: "Hey",
			image: false,
			recommendation: false,
		},
		{
			user: false,
			message: "Response",
			image: false,
			recommendation: false,
		},
		{
			user: false,
			message: [
				{
					id: "1",
					name: "Blue shirt",
					image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/z/g/d/xl-st2-vebnor-original-imagpw72vhqfczsp.jpeg?q=90",
					gender: "Men",
					cat: "Topwear",
				},
				{
					id: "2",
					name: "Blue shirt",
					image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/z/g/d/xl-st2-vebnor-original-imagpw72vhqfczsp.jpeg?q=90",
					gender: "Men",
					cat: "Topwear",
				},
				{
					id: "3",
					name: "Blue shirt",
					image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/z/g/d/xl-st2-vebnor-original-imagpw72vhqfczsp.jpeg?q=90",
					gender: "Men",
					cat: "Topwear",
				},
				{
					id: "4",
					name: "Blue shirt",
					image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/z/g/d/xl-st2-vebnor-original-imagpw72vhqfczsp.jpeg?q=90",
					gender: "Men",
					category: "Shirts",
					cat: "Topwear",
				},
				{
					id: "5",
					name: "Blue shirt",
					price: "300",
					image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/z/g/d/xl-st2-vebnor-original-imagpw72vhqfczsp.jpeg?q=90",
					gender: "Men",
					category: "Shirts",
					cat: "Topwear",
				},
				{
					id: "6",
					name: "Blue shirt",
					price: "300",
					image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/z/g/d/xl-st2-vebnor-original-imagpw72vhqfczsp.jpeg?q=90",
					gender: "Men",
					category: "Shirts",
					cat: "Topwear",
				},
			],
			image: true,
			recommendation: [
				{
					id: "10",
					name: "Grey Pants",
					price: "500",
					image: "https://assets.ajio.com/medias/sys_master/root/20221230/wXVL/63aec149aeb269659c17e981/-473Wx593H-443007815-ltgrey-MODEL.jpg",
					gender: "Women",
					category: "Pants",
					cat: "Bottomwear",
				},
				{
					id: "20",
					name: "Grey Pants",
					price: "500",
					image: "https://assets.ajio.com/medias/sys_master/root/20221230/wXVL/63aec149aeb269659c17e981/-473Wx593H-443007815-ltgrey-MODEL.jpg",
					gender: "Women",
					category: "Pants",
					cat: "Bottomwear",
				},
				{
					id: "30",
					name: "Grey Pants",
					price: "500",
					image: "https://assets.ajio.com/medias/sys_master/root/20221230/wXVL/63aec149aeb269659c17e981/-473Wx593H-443007815-ltgrey-MODEL.jpg",
					gender: "Women",
					category: "Pants",
					cat: "Bottomwear",
				},
				{
					id: "40",
					name: "Grey Pants",
					price: "500",
					image: "https://assets.ajio.com/medias/sys_master/root/20221230/wXVL/63aec149aeb269659c17e981/-473Wx593H-443007815-ltgrey-MODEL.jpg",
					gender: "Women",
					category: "Pants",
					cat: "Bottomwear",
				},
				{
					id: "50",
					name: "Grey Pants",
					price: "500",
					image: "https://assets.ajio.com/medias/sys_master/root/20221230/wXVL/63aec149aeb269659c17e981/-473Wx593H-443007815-ltgrey-MODEL.jpg",
					gender: "Women",
					category: "Pants",
					cat: "Bottomwear",
				},
				{
					id: "60",
					name: "Grey Pants",
					price: "500",
					image: "https://assets.ajio.com/medias/sys_master/root/20221230/wXVL/63aec149aeb269659c17e981/-473Wx593H-443007815-ltgrey-MODEL.jpg",
					gender: "Women",
					category: "Pants",
					cat: "Bottomwear",
				},
			],
		},
	]);
	function submitHandler(e) {
		e.preventDefault();
		let con = conversation;
		con.push({
			user: true,
			message: query,
		});
		setConversation(con);
		const convo = con.filter((msg) => {
			return msg.user === true;
		});
		console.log(convo.slice(-3));
		setQuery("");
		
		con.push({
			user: false,
			message: "Response",
			image: false,
			recommendation: false,
		});
		setConversation(con);
		console.log(conversation);
	}
	useEffect(() => {
		textareaRef.current.style.height = "0px";
		const scrollHeight = textareaRef.current.scrollHeight;
		textareaRef.current.style.height = scrollHeight + "px";
	}, [query]);
	useEffect(() => {
		console.log("Im in useEffect");
		if (conversation.length) {
			finalRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [conversation.length]);
	function outfitDetails(outfit) {
		let outfitName = "";
		let outfitPrice = 0;
		if (outfit.topwear.name) {
			outfitName += outfit.topwear.name;
			outfitPrice += parseInt(outfit.topwear.price);
			if (outfit.bottomwear.name) {
				outfitName += " + " + outfit.bottomwear.name;
				outfitPrice += parseInt(outfit.bottomwear.price);
				if (outfit.shoes.name) {
					outfitName += " + " + outfit.shoes.name;
					outfitPrice += parseInt(outfit.shoes.price);
				}
			} else {
				if (outfit.shoes.name) {
					outfitName += " + " + outfit.shoes.name;
					outfitPrice += parseInt(outfit.shoes.price);
				}
			}
		} else {
			if (outfit.bottomwear.name) {
				outfitName += outfit.bottomwear.name;
				outfitPrice += parseInt(outfit.bottomwear.price);
				if (outfit.shoes.name) {
					outfitName += " + " + outfit.shoes.name;
					outfitPrice += parseInt(outfit.shoes.price);
				}
			} else {
				if (outfit.shoes.name) {
					outfitName += outfit.shoes.name;
					outfitPrice += parseInt(outfit.shoes.price);
				} else {
					outfitName = "Select clothes to create outfit";
				}
			}
		}
		return [outfitName, outfitPrice];
	}
	const outfitDet = outfitDetails(outfit);
	return (
		<div>
			<Navbar showOutfit={showOutfit} setShowOutfit={setShowOutfit}/>
			<div className="h-full px-32 ">
				{(showModal || showOutfit) && (
					<EditModal
						title={`${showOutfit ? "Current Outfit" : "More info"}`}
						isStepModal={false}
						closeHandler={() => {
							setShowModal(false);
							setShowOutfit(false);
						}}
					>
						{showOutfit ? (
							<div className="flex flex-col">
								<div className="my-2 text-lg font-bold">
									{outfitDet[0]}
								</div>
								<div className="flex flex-row my-2">
									{outfit.topwear.image ? (
										<img
											src={outfit.topwear?.image}
											alt=""
											className="w-56 mr-2"
										/>
									) : (
										<></>
									)}
									{outfit.bottomwear.image ? (
										<img
											src={outfit.bottomwear?.image}
											alt=""
											className="w-56 mx-2"
										/>
									) : (
										<></>
									)}
									{outfit.shoes.image ? (
										<img
											src={outfit.shoes?.image}
											alt=""
											className="w-56 ml-2"
										/>
									) : (
										<></>
									)}
								</div>
								<div className="my-2 text-lg">
									<span className=" font-bold">Price:</span> ₹
									{outfitDet[1]}
								</div>
							</div>
						) : (
							<div className="flex flex-row">
								<img
									src={product.image}
									alt=""
									className="w-56"
								/>
								<div className="flex flex-col mx-5 justify-center w-full">
									<div className="my-3 text-lg">
										Name: {product.name}
									</div>
									<div className="my-3 text-lg">
										Price: ₹{product.price}
									</div>
									<div className="my-3 text-lg">
										Gender:
										{product.gender === "Men" ? (
											<FontAwesomeIcon
												icon={faMars}
												className="px-2"
												title="Men"
											/>
										) : (
											<FontAwesomeIcon
												icon={faVenus}
												className="px-2"
												title="Women"
											/>
										)}
									</div>
									<div className="my-3 text-lg">
										Category: {product.category}
									</div>
									<div className="flex justify-center my-3">
										{product.id === outfit.topwear.id ||
										product.id === outfit.bottomwear.id ||
										product.id === outfit.shoes.id ? (
											<button
												className="bg-red-500 text-white px-3 py-2 rounded-sm"
												onClick={() => {
													// console.log(product)
													setOutfit({
														...outfit,
														[product.cat.toLowerCase()]: {},
													});
													setShowModal(false);
												}}
											>
												Unselect
											</button>
										) : (
											<button
												className="bg-green-500 text-white px-3 py-2 rounded-sm"
												onClick={() => {
													console.log(product.cat.toLowerCase())
													setOutfit({
														...outfit,
														[product.cat.toLowerCase()]:
															product,
													});
													setShowModal(false);
												}}
											>
												Select
											</button>
										)}
									</div>
								</div>
							</div>
						)}
					</EditModal>
				)}
				<div id="content" className="h-[35rem] overflow-auto  px-2">
					{conversation.length === 0 ? (
						<div className="flex justify-center items-center text-xl font-bold py-64 opacity-40">
							Start a conversation to find your next outfit
						</div>
					) : (
						<></>
					)}
					{conversation.map((msg, indexM) => {
						return (
							<div>
								{msg.user ? (
									<div
										key={indexM}
										className="bg-green-600 text-white flex max-w-xl px-3 ml-auto justify-end py-2 rounded-sm my-3 "
									>
										{msg.message}
									</div>
								) : (
									<div>
										{msg.image ? (
											<div className="flex flex-row">
												<div className="bg-[#f8f8f8] px-3 max-w-xl py-2 rounded-sm my-3">
													Recommended Outfits
													<div className="grid grid-cols-5 gap-2 py-2 ">
														{msg.recommendation.map(
															(img, indexI) => {
																return (
																	<img
																		key={
																			indexI
																		}
																		src={
																			img.image
																		}
																		alt=""
																		srcset=""
																		onClick={() => {
																			setShowModal(
																				true
																			);
																			setProduct(
																				img
																			);
																		}}
																		className={`cursor-pointer border-2 ${
																			img.id ===
																				outfit
																					.bottomwear
																					.id ||
																			img.id ===
																				outfit
																					.topwear
																					.id ||
																			img.id ===
																				outfit
																					.shoes
																					.id
																				? "border-4 border-green-500"
																				: ""
																		}`}
																	/>
																);
															}
														)}
													</div>
												</div>
												<div className="bg-[#f8f8f8] px-3 max-w-xl py-2 rounded-sm my-3 mx-2">
													<div className="grid grid-cols-5 gap-2 py-2">
														{msg.message.map(
															(img, indexImg) => {
																return (
																	<img
																		key={
																			indexImg
																		}
																		src={
																			img.image
																		}
																		alt=""
																		srcset=""
																		onClick={() => {
																			setShowModal(
																				true
																			);
																			setProduct(
																				img
																			);
																		}}
																		className={`cursor-pointer border-2 ${
																			img.id ===
																				outfit
																					.bottomwear
																					.id ||
																			img.id ===
																				outfit
																					.topwear
																					.id ||
																			img.id ===
																				outfit
																					.shoes
																					.id
																				? "border-4 border-green-500"
																				: ""
																		}`}
																	/>
																);
															}
														)}
													</div>
												</div>
											</div>
										) : (
											<div className="bg-[#f8f8f8] px-3 max-w-xl py-2 rounded-sm my-3">
												{msg.message}
											</div>
										)}
									</div>
								)}
								<div id="final-message" ref={finalRef}></div>
							</div>
						);
					})}
				</div>
				<div
					id="textbox"
					className="flex flex-row justify-center items-center border-2 border-[#f3f3f3] bg-[#f3f3f3] my-2"
				>
					<FontAwesomeIcon
						icon={faShirt}
						className="px-2 cursor-pointer text-green-500"
						title="View current outfit"
						onClick={() => setShowOutfit(true)}
					/>
					<div className="flex flex-row w-full items-center justify-center border-l-2 border-[#aaa] my-2 ">
						<textarea
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="px-3 bg-transparent w-full resize-none outline-0"
							placeholder="Write your message"
							ref={textareaRef}
						/>
						<div className="text-white bg-green-600 w-10 h-10 flex items-center justify-center rounded-sm cursor-pointer">
							<FontAwesomeIcon
								icon={faPaperPlane}
								onClick={submitHandler}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
