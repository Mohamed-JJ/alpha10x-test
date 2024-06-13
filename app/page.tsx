"use client"

import Popup from "@/component/popup";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function Home() {
  const apiKey = process.env.API_KEY
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState<[]>([]);
  const [modlar, setModlar] = useState<boolean>(false);

  const modlarClickHandler = (image: any) => {
    setSelectedImage(image);
    setModlar(true);
  };

  const fetchImages = async (query: string | null) => {
    try {
      const url = query
        ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25&offset=0&lang=en&bundle=messaging_non_clips`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&offset=0&lang=en&bundle=messaging_non_clips`;

      const response = await axios.get(url);
      const untreatedImages = response.data.data;
      const sortedDates = untreatedImages.sort((a: any, b: any) => {
        return Number(new Date(b.import_datetime)) - Number(new Date(a.import_datetime));
      });
      const filteredImages = sortedDates.filter((img: any) => img.username && img.username !== "");
      setImages(filteredImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const debouncedFetchImages = useCallback(debounce(fetchImages, 300), []);

  useEffect(() => {
    debouncedFetchImages(searchQuery);
    return () => {
      debouncedFetchImages.cancel();
    };
  }, [searchQuery, debouncedFetchImages]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModlar(false);
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <main className={`w-full h-full flex justify-center flex-col gap-3 items-center`}>
      {modlar ? (
        <Popup image={selectedImage} handler={() => {
          setModlar(false);
          setSelectedImage(null);
        }} />
      ) : (
        <div className="w-full h-full flex justify-center flex-col gap-3 items-center">
          <div className="w-[20%] h-[1%] mt-5">
            <input
              type="text"
              className="text-black"
              placeholder="search gif"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="h-full w-[50%] flex items-center flex-wrap gap-4 mt-5">
            {images.map((image: any, index: any) => (
              <div key={index} className="h-auto w-[20%] text-white">
                <img
                  className="h-auto w-full"
                  src={image?.images.original.url}
                  alt={image?.title}
                  onClick={() => modlarClickHandler(image)}
                />
                {image?.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
