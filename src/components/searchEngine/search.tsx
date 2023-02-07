import styled from "styled-components";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import Suggections from "@/components/searchEngine/suggestions";
import { useRouter } from "next/router";

export default function Search() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    setSearchTerm(e.target.value);
  }

  async function handleControl(e: KeyboardEvent) {
    if (e.key === "Enter") await router.push("/result/" + searchTerm);
  }

  return (
    <>
      <AppName>Image Browser</AppName>
      <SearchInput
        type="text"
        onChange={handleSearch}
        onKeyDown={handleControl}
      />
      <Suggections
        query={searchTerm}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

const AppName = styled.h1`
  color: #fff;
  background: #7f7fd5; /* fallback for old browsers */

  background: linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  animation: gradient 3s ease infinite;
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
`;

const SearchInput = styled.input`
  padding: 0.5em;
  width: 450px;
  font-size: 0.8rem;
  border: 2px solid black;
  border-radius: 6px;
  outline: none;
  transition: 0.2s ease-in;
  &:focus {
    border: 2px solid #57d02c;
  }
`;
