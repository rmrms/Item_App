import { useState } from "react";
import { useItems } from "../context/ItemContext";

const Search = () => {
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState("");

  // const handleSearch = (term) => {
  //   searchTerm(term);
  // };

  if (!items || items.length === 0) {
    return <p>No items to search.</p>;
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
