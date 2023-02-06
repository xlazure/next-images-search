import React, { useState } from "react";
import { useQuery } from "react-query";

const apiKey = process.env.UNSPLASH_KEY;

export default function UnsplashImages({query,page2}:any) {

    const [page, setPage] = useState(page2);

    const { data, status } = useQuery(
        ["unsplash-images", query, page],
        async () => {
            const API_URL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&page=${page}`;
            const res = await fetch(API_URL, {
                method: "GET",
            });
            return res.json();
        }
    );

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <input type="number" value={page} onChange={(e) => setPage(e.target.value)} />
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>Error</p>}
            {status === "success" &&
                data.results.map((image) => (
                    <img key={image.id} src={image.urls.thumb} alt={image.description} />
                ))}
        </div>
    );
}
