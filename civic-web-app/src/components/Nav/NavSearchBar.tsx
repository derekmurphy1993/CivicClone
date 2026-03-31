import { useState } from "react";

import SearchBar from "../SearchBar/SearchBar";

export default function NavSearchBar() {
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchBar filteredTags={filteredTags} setFilteredTags={setFilteredTags}
      searchInput={searchInput} setSearchInput={setSearchInput}
    />
  );
}
