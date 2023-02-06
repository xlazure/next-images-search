import Image from "next/image";
import styled from "styled-components";

interface PhotoProps {
  alt_description: string;
  urls: {
    full: string;
    regular: string;
  };
}
export default function PhotoContainer(props: PhotoProps) {
  const { urls, alt_description } = props;
  return <Img src={urls.regular} alt={alt_description} />;
}

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  background-color: pink;
  overflow: hidden;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 100%;
`;
