import styles from "./SearchBox.module.sass";
import { FormEvent, useRef, useState } from "react";
import { debounce } from "lodash";
import { useSetRecoilState } from "recoil";
import { searchBoxInput } from "@/app/states";
import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  const [showInput, setShowInput] = useState(false);
  const setInput = useSetRecoilState(searchBoxInput);

  const debounceSearch = useRef(
    debounce(async (input: string) => setInput(input), 1000)
  ).current;

  const handleInputChanges = (event: FormEvent<HTMLInputElement>) => {
    debounceSearch(event.currentTarget.value);
  };

  return (
    <div className={styles.searchBoxContainer}>
      <input
        className={styles.searchBox}
        type="text"
        onInputCapture={handleInputChanges}
      />
      <IoSearch className={styles.icon} />
    </div>
  );
};

export default SearchBox;
