import { useEffect, useState } from "react";

const apiKey = process.env.UNSPLASH_KEY;
export default function useFetchImages<T>(query: string, page: number) {
  const [images, setImages] = useState<Array<any>>();
  async function getImages(): Promise<Array<any>> {
    const API_URL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=30`;
    try {
      const res = await fetch(API_URL, {
        method: "GET",
      });
      return res.json();
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  useEffect(() => {
    getImages().then((data: any) => {
      if (data && data.results) {
        setImages(data.results);
      }
    });
  }, [query, page]);
  return { loading: true, results: images };
}
