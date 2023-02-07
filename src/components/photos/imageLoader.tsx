import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface ImageProps {
  src: string;
  alt: string;
  modal?: boolean;
  showFullImage?: () => void | null;
  wrapperRef?: any;
}

const ImageLoader: React.FC<ImageProps> = ({
  src,
  alt,
  modal = false,
  showFullImage = () => {},
  wrapperRef,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.style.display = "none";

    image.onload = () => {
      image.style.display = "block";
      setIsLoading(false);
    };
    image.onerror = () => {
      wrapperRef.current.style = "display:none;";
    };
  }, [src]);

  return (
    <>
      {isLoading && <p style={{ color: "black" }}>Loading...</p>}
      <Img src={src} alt={alt} onClick={() => showFullImage()} modal={modal} />
    </>
  );
};

export default ImageLoader;

const Img = styled.img<ImageProps>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  ${(props) =>
    props.modal
      ? null
      : `&:hover {
    transform: scale(1.1, 1.1);
  }`}
`;
