import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
const Popup = ({ image, handler }: { image: any; handler: any }) => {
	const apiKey = process.env.API_KEY

	const [relatedContent, setRelatedContent] = useState([]);
	const [imageSizes, setImagesSizes] = useState<string | null>("h-[30px] w-[30px]");

	useEffect(() => {
		setImagesSizes(`h-auto w-[150px]`);
		const fetchRelatedContent = async () => {
			const imgs = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(image.title)}&api_key=${apiKey}&gif_id=${image.id}`);
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
			<div className='flex flex-col items-center justify-center gap-5'>
				<img src={image?.images.original.url} alt={image?.title} className={`mt-5 ${imageSizes} rounded-xl`} />
				<div className=' flex flex-row w-full justify-center text-white gap-5 mt-5'>
					<div className="hover:cursor-pointer w-auto h-auto" onClick={() => { setImagesSizes(`h-auto w-[150px]`) }}>default</div>
					<div className="hover:cursor-pointer w-auto h-auto" onClick={() => setImagesSizes(`h-auto w-[200px]`)}>medium</div>
					<div className="hover:cursor-pointer w-auto h-auto" onClick={() => setImagesSizes(`h-auto w-[250px]`)}>big</div>
					<div className="hover:cursor-pointer w-auto h-auto" onClick={() => setImagesSizes(`h-auto w-[350px]`)}>large</div>
				</div>
			</div>
			<div >
				<h1 className='text-white mt-5 text-xl font-semibold'>
					some related gifs
				</h1>
			</div>
			<div className="h-full w-[50%] flex items-center flex-wrap gap-5 mt-5">
				{relatedContent.map((image: any, index: any) => {
					return <div key={index} className="h-[20%] w-[30%] text-white flex flex-col gap-5 bg-slate-800 p-5 rounded-xl items-center justify-center">
						<img className="h-full w-auto rounded-md" src={image?.images.original.url} alt={image?.title} />
						<div>

							{image?.title!}
						</div>
					</div>
				})}
			</div>
		</div>
	)
}

export default Popup