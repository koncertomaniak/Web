import styles from "./SearchBox.module.sass";
import { FormEvent, useRef } from "react";
import { debounce } from "lodash";
import { useSetRecoilState } from "recoil";
import { searchBoxInput } from "@/app/states";

const SearchBox = () => {
  const setInput = useSetRecoilState(searchBoxInput);

  const debounceSearch = useRef(
    debounce(async (input: string) => setInput(input), 1000)
  ).current;

  const handleInputChanges = (event: FormEvent<HTMLInputElement>) => {
    debounceSearch(event.currentTarget.value);
  };

  return (
    <div className={styles.searchBox}>
      <input type="text" onInputCapture={handleInputChanges} />
    </div>
  );
};

export default SearchBox;
