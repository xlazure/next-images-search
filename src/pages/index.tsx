import Head from "next/head";
import FallingStars from "@/components/stars/fallingStars";
import styled from "styled-components";
import Search from "@/components/searchEngine/search";

export default function Home() {
  return (
    <>
      <Head>
        <title>Image Browser</title>
        <meta
          name="description"
          content="Next.js aplication, where you can find images"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SearchWrapper>
          <Search />
        </SearchWrapper>
        <FallingStars />
      </Container>
    </>
  );
}

const SearchWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;
