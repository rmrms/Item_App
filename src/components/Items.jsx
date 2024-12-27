import { useItems } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const { items } = useItems();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return <p>No items available.</p>;
  }

  return (
    <div className="items-page">
      <h1>Items Inventory</h1>

      <button onClick={() => navigate("/add-item")}>
        + Add New Item
      </button>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(`/items/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;

///////// NOT READY YET ///////////////