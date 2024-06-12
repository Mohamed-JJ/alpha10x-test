import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
const Popup = ({ image, handler }: { image: any; handler: any }) => {
	const [relatedContent, setRelatedContent] = useState([]);
	const [imageSizes, setImagesSizes] = useState<string | null>("h-[30px] w-[30px]");

	useEffect(() => {
		const fetchRelatedContent = async () => {
			const imgs = await axios.get(`https://api.giphy.com/v1/gifs/related?api_key=UC6QeKH1sTZwo7OgHc1oAJJu4JFV59TJ&gif_id=${image.id}`);
			const untreatedImages = imgs.data.data;
			const sortedd_dates = untreatedImages.sort((a: any, b: any) => {
				return Number(new Date(b.import_datetime)) - Number(new Date(a.import_datetime));
			});
			const filteredimgs = sortedd_dates.filter((img: any) => img.username && img.username !== "");
			console.log(filteredimgs);
			setRelatedContent(filteredimgs)
		}
		fetchRelatedContent();
	}, [image])
	return (
		<div className='w-full h-full flex flex-col items-center overflow-hidden gap-5 relative'>
			{/* <div className='absolute right-0 top-0'>
				<IoClose className='text-white' onClick={() => { handler() }} />
			</div> */}
			<div>
				<img src={image?.images.original.url} alt={image?.title} className={`mt-5 ${imageSizes}`} />
			</div>
			<div className='flex flex-row text-white'>
				<div className="hover:cursor-pointer ml-5" onClick={() => {setImagesSizes("h-[30px] w-[30px]"); console.log("hello at default")}}>default</div>
				<div className="hover:cursor-pointer ml-5" onClick={() => setImagesSizes("h-[50px] w-[50px]")}>medium</div>
				<div className="hover:cursor-pointer ml-5" onClick={() => setImagesSizes("h-[70px] w-[70px]")}>big</div>
				<div className="hover:cursor-pointer ml-5" onClick={() => setImagesSizes("h-[90px] w-[90px]")}>larg</div>
			</div>
			<div >
				<h1 className='text-white mt-5'>
					some related gifs
				</h1>
			</div>
			<div className="h-full w-[50%] flex items-center flex-wrap gap-4 mt-5">
				{relatedContent.map((image: any, index: any) => {
					return <div key={index} className="h-auto w-[20%] text-white">
						<img className="h-auto w-full" src={image?.images.original.url} alt={image?.title} />
						{image?.import_datetime!}
					</div>
				})}
			</div>
		</div>
	)
}

export default Popup