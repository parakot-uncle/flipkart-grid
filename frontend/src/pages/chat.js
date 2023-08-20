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
import axios from "axios";
import { ClapSpinner } from "react-spinners-kit";

export default function chat() {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [product, setProduct] = useState({});
	let currOutfit = {};
	const [outfit, setOutfit] = useState({
		topwear: {},
		bottomwear: {},
		shoes: {},
	});
	const [showOutfit, setShowOutfit] = useState(false);
	const textareaRef = useRef();
	const finalRef = useRef();
	const [conversation, setConversation] = useState([]);
	async function submitHandler(e) {
		e.preventDefault();
		setLoading(true);
		// console.log(query)
		// let con = conversation;
		// con.push({
		// 	user: true,
		// 	message: query,
		// 	image: false,
		// 	recommendation: false,
		// });
		// setConversation(con);
		// let convo = con.filter((msg) => {
		// 	return msg.user === true;
		// }).map((msg) => {
		// 	return msg.message
		// });
		// console.log(convo.slice(-3));
		// const converse = convo.slice(0,convo.length-1)
		// console.log(converse)
		// const response = await axios.post("http://localhost:8000/api/outfit/prompt-outfit", {
		// 	"query": query,
		// 	"previous_queries": converse,
		// 	"gender": "Women"
		// })
		// console.log(response)
		// setQuery("");

		// con.push({
		// 	user: false,
		// 	message: response.data.results,
		// 	image: true,
		// 	recommendation: [],
		// });
		// setConversation(con);
		// console.log(conversation);
		setTimeout(() => {
			setLoading(false);
		}, 5000);
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
	useEffect(() => {
		if (outfit.topwear.id) {
			currOutfit.topwear = outfit.topwear.id;
		}
		if (outfit.bottomwear.id) {
			currOutfit.bottomwear = outfit.bottomwear.id;
		}
		if (outfit.shoes.id) {
			currOutfit.shoes = outfit.shoes.id;
		}
		console.log(currOutfit);
		if (
			(currOutfit.topwear || currOutfit.bottomwear || currOutfit.shoes) &&
			!(currOutfit.topwear && currOutfit.bottomwear && currOutfit.shoes)
		) {
			getRecommendations(currOutfit);
		}
	}, [outfit]);
	async function getRecommendations(outfit) {
		setLoading(true);
		// const response = await axios.post(
		// 	"http://localhost:8000/api/outfit/select-outfit",
		// 	{
		// 		selected_items: outfit,
		// 	}
		// );
		// let lastMsg = conversation[conversation.length-1].recommendation
		// if(response.data.topwear){
		// 	lastMsg = lastMsg.concat(response.data.topwear)
		// }
		// if(response.data.bottomwear){
		// 	lastMsg = lastMsg.concat(response.data.bottomwear)
		// }
		// if (response.data.shoes) {
		// 	lastMsg = lastMsg.concat(response.data.shoes);
		// }
		// console.log(lastMsg)
		// setConversation((prevState) => {
		// 	let newState = [...prevState];
		// 	console.log(newState)
		// 	newState[newState.length-1].recommendation = lastMsg
		// 	console.log(newState)
		// 	return newState
		// })
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	}
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
	console.log(outfit);
	return (
		<div>
			<Navbar showOutfit={showOutfit} setShowOutfit={setShowOutfit} />
			<div className="absolute ml-[48%] mt-[17%] z-10">
				<ClapSpinner loading={loading} />
			</div>
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
														[product.category.toLowerCase()]:
															{},
													});
													setShowModal(false);
												}}
											>
												Unselect
											</button>
										) : (
											<button
												className="bg-green-500 text-white px-3 py-2 rounded-sm"
												onClick={async () => {
													// console.log(product.cat.toLowerCase())
													setOutfit({
														...outfit,
														[product.category.toLowerCase()]:
															product,
													});
													setShowModal(false);
													console.log(currOutfit);
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
																// console.log("Hello sir"+indexI)
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
																// console.log(img)
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
							onKeyDown={(e) => {
								if (e.key == "Enter") {
									submitHandler(e);
								}
							}}
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
