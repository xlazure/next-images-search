import { useRouter } from "next/router";
import styled from "styled-components";
import PhotoContainer from "@/components/photos/photoContainer";
import { useEffect, useState } from "react";
const apiKey = process.env.UNSPLASH_KEY;

export default function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState([]);
  const router = useRouter();
  const { result } = router.query;

  // const {results} = photos;
  // function Gallery(test:boolean) {
  //     if(test) return <h1>Loading...</h1>
  //     else return <>
  //         {
  //             list.map((photo,index) => <PhotoContainer key={index} {...photo} />)
  //         }
  //     </>
  //
  // }

  useEffect(() => {
    getImages(String(result)).then((data) => setList(data.results));
  }, [result]);

  return (
    <Wrapper>
      <h3>Result: {result}</h3>

      <Container>
        {list.length > 0
          ? list.map((item) => <PhotoContainer {...item} />)
          : null}
      </Container>
    </Wrapper>
  );
}

async function getImages(query: string): Promise<any> {
  const API_URL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=30`;
  const res = await fetch(API_URL, { method: "GET" });
  return await res.json();
}

const Wrapper = styled.div`
  color: #fff;
  padding: 0 2em;
  max-width: 1400px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #3f3f3f;
`;
const Container = styled.div`
  margin-top: 1em;
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* grid-template-rows: 1fr; */
  /* grid-gap: 16px; */
  height: 95vh;

  overflow-y: auto;
`;
