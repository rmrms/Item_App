import React, { useState, useEffect } from "react";
import { useItems } from "../context/ItemContext";

const Updates = () => {
  const { items, updateItemLocation, updateItemQuantity, updatedItems } =
    useItems();
  const [newUpdate, setNewUpdate] = useState({
    itemId: "",
    date: "",
    type: "",
    amount: "",
    location: {
      country: "",
      city: "",
      storage: "",
    },
  });

  useEffect(() => {
    console.log("Items updated in Updates:", items);
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country" || name === "city" || name === "storage") {
      setNewUpdate((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setNewUpdate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { itemId, type, amount, location } = newUpdate;
    if (type === "updateQuantity" && amount) {
      updateItemQuantity(parseInt(itemId, 10), parseInt(amount, 10));
    } else if (type === "updateLocation" && location) {
      updateItemLocation(parseInt(itemId, 10), location);
    }
    // Reset form state
    setNewUpdate({
      itemId: "",
      date: "",
      type: "",
      amount: "",
      location: { country: "", city: "", storage: "" },
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="transactions">
      <h1>Update Tracker</h1>
      <ul>
        {updatedItems.map((update) => {
          const item = items.find((i) => i.id === update.id);
          if (!item) return null; // Skip if item no longer exists
          return (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Location:{" "}
              {item.location ? (
                <>
                  {item.location.country}, {item.location.city},{" "}
                  {item.location.storage}
                </>
              ) : (
                "Unknown Location"
              )}{" "}
              - Last Updated: {item.lastUpdated}
            </li>
          );
        })}
      </ul>

      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="itemId"
          value={newUpdate.itemId}
          onChange={handleChange}
          required
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={newUpdate.date}
          onChange={handleChange}
          min={getCurrentDate()}
          required
        />
        <select
          name="type"
          value={newUpdate.type}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="updateQuantity">Update Quantity</option>
          <option value="updateLocation">Update Location</option>
        </select>
        {newUpdate.type === "updateQuantity" && (
          <input
            type="number"
            name="amount"
            value={newUpdate.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
        )}
        {newUpdate.type === "updateLocation" && (
          <>
            <input
              type="text"
              name="country"
              value={newUpdate.location.country}
              onChange={handleChange}
              placeholder="Country"
              required
            />
            <input
              type="text"
              name="city"
              value={newUpdate.location.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="storage"
              value={newUpdate.location.storage}
              onChange={handleChange}
              placeholder="Storage"
              required
            />
          </>
        )}
        <button type="submit" className="primary-button">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default Updates;
