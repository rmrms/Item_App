import { useState } from "react";
import { useItems } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";

const AddItemPage = () => {
  const { addItem } = useItems();
  const navigate = useNavigate();

  // States for form fields.

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (name.trim() === "") {
      alert("Item name is required.");
      return;
    }

    addItem({
      name,
      quantity,
      price,
      tags: tags.split(",").map((tag) => tag.trim()),
      notes,
    });
    navigate("/items");
  };

  return (
    <div className="add-item-page">
      <h1>Add New Item</h1>
      <button onClick={() => navigate("/items")}>← Back</button>
      <div>
        <label>
          Item Name:
          <input
            type="text"
            placeholder="Enter Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <p>Total Value: {quantity * price}</p>
      </div>
      <div>
        <label>
          Tags:
          <input
            type="text"
            placeholder="Enter tags, separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Notes:
          <textarea
            placeholder="Add notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AddItemPage;
