import { useRouter } from "next/router";
import styled from "styled-components";
import ImageContainer from "@/components/photos/ImageContainer";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import FallingStars from "@/components/stars/fallingStars";
import ImageLoader from "@/components/photos/imageLoader";
import { TfiInfoAlt } from "react-icons/tfi";
import { BsArrowReturnLeft } from "react-icons/bs";
const apiKey = process.env.UNSPLASH_KEY;

interface ModalProps {
  open: boolean;
  props: {
    url: string;
    alt: string;
  };
}

export default function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingBtn, setLoadingBtn] = useState<boolean>(true);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    open: false,
    props: {
      url: "",
      alt: "",
    },
  });

  const [page, setPage] = useState(1);
  const [list, setList] = useState<Array<any>>([]);
  const router = useRouter();
  const { result } = router.query;

  useEffect(() => {
    if (result === undefined) return;
    getImages(String(result), page).then((data) => {
      console.log(data.results);
      if (data.results.length === 0) {
        setLoadingBtn(false);
      }
      setList((prevArray) => [...prevArray, ...data.results]);
      setShowLoading(false);
      setLoading(false);
    });
  }, [result, page]);

  function loadMore() {
    setShowLoading(true);
    setPage(page + 1);
  }

  function FullImageModal({ props }: any) {
    const Overlay = styled.div`
      position: fixed;
      z-index: 12;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000081;

      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const Modal = styled.div`
      background-color: #fff;
      margin: 0 auto;
      width: fit-content;
      height: 80%;
      display: flex;
      padding: 0 1em;
      img {
        max-width: 1200px;
      }
    `;
    const CloseModal = styled.button`
      position: fixed;
      border: 2px solid var(--main-color);
      background-color: #000;
      color: #fff;
      padding: 0.5em;
      font-size: 1.1rem;
      top: 1em;
      right: 1em;

      &:hover {
        color: var(--main-color);
        cursor: pointer;
      }
    `;

    if (props)
      return (
        <Overlay>
          <CloseModal onClick={closeModal}>Close</CloseModal>
          <Modal>
            <ImageLoader src={props.url} alt={props.alt} modal={true} />
          </Modal>
        </Overlay>
      );
    else {
      return null;
    }
  }

  function NoResults() {
    return (
      <PosFlex>
        <TfiInfoAlt fontSize={64} />
        <h3>No photos found</h3>
        <button onClick={() => router.back()}>Back to search</button>
      </PosFlex>
    );
  }

  function LoadingBtn() {
    return (
      <>
        {list.length !== 0 ? (
          <LoadMoreBtn onClick={loadMore}>
            {showLoading ? "Loading..." : "Show more"}
          </LoadMoreBtn>
        ) : null}
      </>
    );
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

  function closeModal() {
    setModal((value: any) => ({
      ...value,
      open: false,
      props: {},
    }));
  }
  function openModal(props: any) {
    setModal((value: any) => ({
      ...value,
      open: true,
      props,
    }));
  }

  return (
    <Wrapper>
      <ReturnBtn onClick={() => router.back()}>
        <BsArrowReturnLeft />
      </ReturnBtn>
      <h3>Result: {result}</h3>

      <Container>
        {loading ? (
          <Loader />
        ) : list.length > 0 ? (
          list.map((item, index) => (
            <ImageContainer
              key={item.id + index}
              {...item}
              openModal={openModal}
            />
          ))
        ) : (
          <NoResults />
        )}
      </Container>
      {loadingBtn ? <LoadingBtn /> : null}
      {modal.open ? <FullImageModal {...modal} /> : null}
      <FallingStars />
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
  color: #fff;
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
  color: #fff;
  padding: 1em 0;
  border: none;
  background-color: transparent;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
    &::after {
      content: " <";
    }
    &::before {
      content: "> ";
    }
  }
`;

const ReturnBtn = styled.button`
  position: fixed;
  z-index: 11;
  top: 0.3em;
  left: 0.3em;
  border: none;
  background-color: #000;
  border: 2px solid var(--main-color);
  padding: 0.5em;
  font-size: 1.2rem;
  color: #fff;
  &:hover {
    cursor: pointer;
    color: var(--main-color);
  }
`;
const PosFlex = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  svg {
    color: var(--main-color);
  }
  button {
    margin-top: 1em;
    border: 2px solid var(--main-color);
    background-color: #000;
    color: #fff;
    padding: 0.5em;
    font-size: 0.7rem;
    top: 1em;
    right: 1em;

    &:hover {
      color: var(--main-color);
      cursor: pointer;
    }
  }
`;

const Loader = styled(BiLoaderAlt)`
  animation: around 4s linear infinite;
  font-size: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes around {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
