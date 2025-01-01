import { useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";

const Items = () => {
  const { items, deleteItem } = useItems();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="items-page">
        <p>No items available. Please add one!</p>
        <button
          className="primary-button"
          onClick={() => navigate("/add-item")}
        >
          + Generate New Item
        </button>
      </div>
    );
  }

  return (
    <div className="items-page">
      <header>
        <h1>Items Inventory</h1>
        <button
          className="primary-button"
          onClick={() => navigate("/add-item")}
          style={{ marginBottom: "20px", marginRight: "10px" }}
        >
          + Generate New Item
        </button>
      </header>
      <section className="item-row-card">
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            <h4
              onClick={() => navigate(`/items/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              {item.name}
            </h4>
            <button
              className="delete-button"
              onClick={() => deleteItem(item.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Items;
