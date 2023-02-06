import styled from "styled-components";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Suggections from "@/components/searchEngine/suggestions";
import {useRouter} from "next/router";

export default function Search() {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>("");

    function handleSearch(e:ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        setSearchTerm(e.target.value)
    }

   async function handleControl(e:KeyboardEvent) {
        if(e.key === 'Enter') await router.push('/result/' + searchTerm);

    }

    return <>
        <SearchInput type='text' onChange={handleSearch} onKeyDown={handleControl}/>
        <Suggections query={searchTerm}  loading={loading} setLoading={setLoading} />
    </>

}

const SearchInput = styled.input`

  padding: .5em;
  width: 450px;
  border: 2px solid black;
  border-radius: 6px;
  outline: none;
  transition: .2s ease-in;
  &:focus {
    border: 2px solid #57d02c;
  }
`