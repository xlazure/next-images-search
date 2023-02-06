import styled from "styled-components";
import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { debounce } from "@/function/debounce";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/router";
interface SuggestProps {
  query: string;
  loading: boolean;
  setLoading: Dispatch<boolean>;
}
export default function Suggections(props: SuggestProps) {
  const { query, loading, setLoading } = props;
  const suggestRef = useRef(null);
  const [suggest, setSuggest] = useState<string[]>([]);
  const debounceSearchTerm = useDebounce(query, 500);
  const router = useRouter();

  function chooseSuggestItem(e: any) {
    console.log(e.keyCode);
  }

  async function searchImages({ item }: string) {
    await router.push("/result/" + item);
  }
  useEffect(() => {
    if (debounceSearchTerm.length > 2) {
      getSuggest(debounceSearchTerm).then((result) => {
        setLoading(false);
        if (result.length === 0) {
          setSuggest(["No suggestion"]);
        } else {
          setSuggest(result);
        }
      });
    } else {
      setLoading(false);
      setSuggest([]);
    }
  }, [debounceSearchTerm, setLoading]);

  return (
    <SuggestContainer ref={suggestRef} onKeyDown={chooseSuggestItem}>
      {query.length >= 0
        ? loading
          ? "loading"
          : suggest.map((item: string, index: number) => (
              <SuggestItem key={index} onClick={searchImages}>
                {item}
              </SuggestItem>
            ))
        : null}
    </SuggestContainer>
  );
}

async function getSuggest(term: string): Promise<any[]> {
  const dictonary = await import("../../dictonary/en.json");
  const suggest = Object.keys(dictonary).filter((key) =>
    key.toLowerCase().includes(term.toLowerCase())
  );
  return suggest.slice(0, 10);
}

const SuggestContainer = styled.ul`
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 6px;
`;

const SuggestItem = styled.li`
  list-style-type: none;

  &:hover {
    cursor: pointer;
    background-color: #c4c4c4;
  }
`;
