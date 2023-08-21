import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Outfit(){
    const [outfits, setOutfits] = useState([]);
	useEffect(() => {
		async function getPreviousOutfits(){
			const response = await axios.get(`http://localhost:8000/api/outfit/?user=${localStorage.getItem("user_id")}`);
			setOutfits(response.data)
		}
		getPreviousOutfits()
	}, [])
    function outfitDetails(outfit){
        let outfitName = ""
        let outfitPrice = 0
        for (let index = 0; index < outfit.length; index++) {
            const element = outfit[index];
            if(index!==outfit.length-1){
                outfitName += element.name + " + "
            }
            else{
                outfitName += element.name
            }
        }
        return ([outfitName, outfitPrice])
    }
	console.log(outfits)
    return (
		<div className="">
			<Navbar />
			<div className="px-32 py-5 min-h-[calc(100vh-5rem)]">
				<div className="text-lg font-semibold">List of your previous outfits:</div>
                {outfits.map((outfit, i) => {
                    const outfitDet = outfitDetails(outfit)
                    return (
						<div key={i} className="bg-white my-3 px-2 py-3">
							<div className="text-lg font-bold">
								{outfitDet[0]}
							</div>
							<div className="flex flex-row my-2">
								<div
									className="mx-2 flex flex-row justify-center items-center"
								>
									<img
										src={outfit.topwear.image}
										alt=""
										className="w-40"
									/>
									<img
										src={outfit.bottomwear.image}
										alt=""
										className="w-40"
									/>
									<img
										src={outfit.shoes.image}
										alt=""
										className="w-40"
									/>
								</div>
							</div>
						</div>
					);
                })}
			</div>
		</div>
	);
}