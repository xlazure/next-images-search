import { url } from "inspector";
import Image from "next/image";
import styled from "styled-components";
import { AiOutlineDownload, AiFillHeart } from "react-icons/ai";
import { userAgent } from "next/server";
import ImageLoader from "./imageLoader";
import { useRef } from "react";

interface ImageProps {
  id: string;
  alt_description: string;
  urls: {
    full: string;
    regular: string;
  };
  links: {
    download: string;
    download_location: string;
    html: string;
    self: string;
  };
  tags: {
    title: string;
  };
  likes: number;
  created_at: string;
  user: {
    name: string;
  };
  openModal: (...args: any) => void;
}
export default function ImageContainer(props: ImageProps) {
  const {
    urls,
    alt_description,
    openModal,
    links,
    tags,
    user,
    created_at,
    likes,
    id,
  } = props;

  const warpperRef = useRef(null);

  function showFullImage() {
    const props = {
      url: urls.full,
      alt: alt_description,
      download: links.download,
      tags: tags,
      user: user.name,
      created_at: created_at,
      likes,
    };

    openModal(props);
  }

  // async function downloadImage(id: string, fileName: string) {
  //   const res = await fetch(`https://api.unsplash.com/photos/${id}/download`);
  //   const blob = await res.blob();
  //   const objectURL = URL.createObjectURL(blob);

  //   // Create a link element to trigger the download
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   a.href = objectURL;
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);

  //   // Revoke the object URL to free up memory
  //   URL.revokeObjectURL(objectURL);
  // }

  return (
    <Wrapper ref={warpperRef}>
      {/* <Img
        onClick={showFull}
        src={urls.regular}
        
      /> */}
      <ImageLoader
        src={urls.regular}
        alt={alt_description}
        showFullImage={showFullImage}
        wrapperRef={warpperRef}
      />
      <Info className="hover">
        <span>
          <p>Author: {user.name}</p>
          <p>
            <AiFillHeart />
            {likes}
          </p>
        </span>
        {/* <a onClick={() => downloadImage(id, id + ".png")}>
          <AiOutlineDownload fontSize={24} className="downloadBtn" />
        </a> */}
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-shadow: 0px 0px 1px 0px var(--main-color);
  position: relative;
  border-radius: 5px;
  display: flex;
  width: 100%;
  overflow: hidden;
  &:not(:first-child) {
    margin-top: 15px;
  }
  &:hover {
    cursor: zoom-in;

    .hover {
      bottom: 0;
    }
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: default;
  transition: bottom 0.3s ease-in;
  position: absolute;
  bottom: -4.5em;
  padding: 0.6em 0;
  font-size: 0.8rem;
  width: 100%;
  background-color: #00000063;

  span {
    text-align: left;
  }
  .downloadBtn:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
  }

  @media screen and (max-width: 768px) {
    bottom: 0;
  }
`;
