import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import "../styles/items/item-page.css";

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
          <strong>Price:</strong> ${item.price}
        </div>
        <div className="item-detail highlighted">
          <strong>Total Value:</strong> ${item.quantity * item.price}
        </div>
        <div className="item-detail">
          <strong>Tags:</strong> {item.tags.join(", ")}
        </div>
        <div className="item-detail">
          <strong>Notes:</strong> {item.notes || "No additional notes."}
        </div>
        <div className="item-detail">
          <strong>Location:</strong>
          {item.location ? (
            <ul>
              <li>{item.location.country}</li>
              <li>{item.location.city}</li>
              <li>{item.location.storage}</li>
            </ul>
          ) : (
            <p>Unknown Location</p>
          )}
        </div>
        {item.arModel && (
          <div className="ar-section">
            <h3>View in AR</h3>
            <iframe
              src={item.arModel}
              title="AR Viewer"
              style={{ width: "100%", height: "300px", border: "none" }}
            ></iframe>
          </div>
        )}
      </div>
      <div className="button-container">
        <button onClick={() => navigate("/items")} className="back-button">
          ← Back to Items
        </button>
        <button onClick={() => navigate("/search")} className="back-button">
          → Back to Search
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
