import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";

const ItemPage = () => {
  const { id } = useParams();
  const { items } = useItems();
  const navigate = useNavigate();

  const item = items.find((i) => i.id.toString() === id);

  if (!item) {
    return (
      <div className="item-page">
        <p>Item not found!</p>
        <button onClick={() => navigate("/items")}>← Back to Items</button>
      </div>
    );
  }

  console.log(item);

  return (
    <div className="item-page">
      <header>
        <h1>{item.name}</h1>
        <p>Last updated: {item.lastUpdated}</p>
      </header>
      <div className="item-details">
        <div className="item-detail">
          <strong>ID:</strong> {item.id}
        </div>
        <div className="item-detail">
          <strong>Quantity:</strong> {item.quantity}
        </div>
        <div className="item-detail">
          <strong>Price:</strong> {item.price}
        </div>
        <div className="item-detail">
          <strong>Total Value:</strong> {item.quantity * item.price}
        </div>
        <div className="item-detail">
          <strong>Tags:</strong> {item.tags.join(", ")}
        </div>
        <div className="item-detail">
          <strong>Notes:</strong> {item.notes}
        </div>
        <div className="item-detail">
          <strong>Location:</strong>
          {item.location ? (
            <>
              <div>{item.location.country}</div>
              <div>{item.location.city}</div>
              <div>{item.location.storage}</div>
            </>
          ) : (
            <div>Unknown Location</div>
          )}
        </div>
      </div>
      <button onClick={() => navigate("/items")} style={{ marginTop: "20px" }}>
        ← Back to Items
      </button>
    </div>
  );
};

export default ItemPage;
