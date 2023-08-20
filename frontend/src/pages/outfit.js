import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Outfit(){
    const [outfits, setOutfits] = useState([
		[
			{
				name: "Blue shirt",
				price: "300",
				image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shirt/z/g/d/xl-st2-vebnor-original-imagpw72vhqfczsp.jpeg?q=90",
				gender: "Men",
				category: "Shirts",
			},{
				name: "Grey Pants",
				price: "500",
				image: "https://assets.ajio.com/medias/sys_master/root/20221230/wXVL/63aec149aeb269659c17e981/-473Wx593H-443007815-ltgrey-MODEL.jpg",
				gender: "Women",
				category: "Pants",
			},
		],
		
	]);

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
            outfitPrice += parseInt(element.price)
        }
        return ([outfitName, outfitPrice])
    }

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
								{outfit.map((wear, j) => {
									return (
										<div key={j} className="mx-2 flex justify-center items-center">
											<img src={wear.image} alt="" className="w-40"/>
										</div>
									);
								})}
							</div>
							<div className="text-lg">
								Price: ₹{outfitDet[1]}
							</div>
						</div>
					);
                })}
			</div>
		</div>
	);
}