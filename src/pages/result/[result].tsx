import { useRouter } from "next/router";
import styled from "styled-components";
import ImageContainer from "@/components/photos/ImageContainer";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
const apiKey = process.env.UNSPLASH_KEY;

export default function Index() {
  const loadMoreRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Array<any>>([]);
  const router = useRouter();
  const { result } = router.query;

  useEffect(() => {
    getImages(String(result), page).then((data) => {
      console.log("fetch...");
      console.log(page);
      console.log(data);
      setList((prevArray) => [...prevArray, ...data.results]);
      setShowLoading(false);
    });
  }, [result, page]);

  function loadMore() {
    setShowLoading(true);
    setPage(page + 1);
  }

  function FullImageModal(props: any) {
    const Overlay = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000044;
    `;
    if (props)
      return (
        <Overlay>
          <Container>{/* <img src={} alt={} /> */}</Container>
        </Overlay>
      );
    else {
      return null;
    }
  }
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (!showLoading) return;
  //       console.log(entry.isIntersecting ? "Visible" : "Not visible");

  //       if (entry.isIntersecting) {
  //         setPerPage(perPage + 2);
  //       }
  //     });
  //   });
  //   if (loadMoreRef.current !== null) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, [loadMoreRef]);

  return (
    <Wrapper>
      <ReturnBtn onClick={() => router.back()}>Return</ReturnBtn>
      <h3>Result: {result}</h3>

      <Container>
        {list.length > 0
          ? list.map((item, index) => (
              <ImageContainer key={item.id + index} {...item} />
            ))
          : null}
      </Container>
      <LoadMoreBtn onClick={loadMore}>
        {showLoading ? <BiLoaderAlt /> : "More"}
      </LoadMoreBtn>
    </Wrapper>
  );
}

async function getImages(query: string, page: number = 1): Promise<any> {
  const API_URL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=30&page=${page}`;
  const res = await fetch(API_URL, { method: "GET" });
  return await res.json();
}

const Wrapper = styled.div`
  text-align: center;
  max-width: 1400px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  /* background-color: #3f3f3f; */
`;
const Container = styled.div`
  padding: 0 2em;
  margin-top: 1em;
  align-items: flex-start;
  column-count: 3;
  column-gap: 15px;
  min-height: 95vh;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    column-count: 2;
  }
  @media screen and (max-width: 480px) {
    column-count: 1;
  }
`;

const LoadMoreBtn = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 2rem;
`;

const ReturnBtn = styled.button`
  position: fixed;
  z-index: 11;
  top: 0.4em;
  left: 0.4em;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
