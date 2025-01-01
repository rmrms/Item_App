import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";

const Search = () => {
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return <p>No items to search.</p>;
  }

  // Filter items based on the search term
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
          <li
            key={item.id}
            onClick={() => navigate(`/items/${item.id}`)}
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
