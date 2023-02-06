import Image from "next/image";
import styled from "styled-components";

interface ImageProps {
  alt_description: string;
  urls: {
    full: string;
    regular: string;
  };
}
export default function ImageContainer(props: ImageProps) {
  const { urls, alt_description } = props;

  function showFull() {}

  return (
    <Wrapper onClick={showFull}>
      <Img src={urls.regular} alt={alt_description} loading="lazy" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 5px;
  display: flex;
  width: 100%;
  overflow: hidden;
  background-color: blue;
  &:not(:first-child) {
    margin-top: 15px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;
