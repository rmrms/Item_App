import React, { useState } from "react";
import { useItems } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import locationsData from "../Addons/pages-addons/countries/locationsData.json";
import { v4 as uuidv4 } from "uuid"; // Import UUID library

const AddItemPage = () => {
  const { addItem, items } = useItems();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");

  const generateRandomItem = () => {
    setName(`Item ${Math.floor(Math.random() * 100)}`);
    setQuantity(Math.floor(Math.random() * 100) + 1);
    setPrice(Math.floor(Math.random() * 500) + 1);
    setTags("random,generated");
    setNotes("This is a randomly generated item.");
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Item name is required.");
      return;
    }
    if (!country || !city || !location) {
      alert("Country, City, and Location are required.");
      return;
    }
    if (items.some((item) => item.name === name)) {
      alert("Item name already exists. Please choose a different name.");
      return;
    }

    const newItem = {
      id: `ITEM-${uuidv4().slice(0, 8).toUpperCase()}`, // Generate a unique ID
      name,
      quantity,
      price,
      tags: tags.split(",").map((tag) => tag.trim()),
      notes,
      location: {
        country,
        city,
        storage: subLocation || location,
      },
    };

    addItem(newItem);
    navigate("/items");
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCity("");
    setLocation("");
    setSubLocation("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setLocation("");
    setSubLocation("");
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setSubLocation("");
  };

  return (
    <div className="add-item-page">
      <h1>Add New Item</h1>
      <button onClick={() => navigate("/items")}> ← Back</button>
      <div>
        <label>
          Item name:
          <input
            type="text"
            placeholder="Enter Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            required
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
            required
          />
        </label>
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
      <div>
        <label>
          Country:
          <select value={country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {locationsData.countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {country && (
        <div>
          <label>
            City:
            <select value={city} onChange={handleCityChange} required>
              <option value="">Select City</option>
              {locationsData.countries
                .find((c) => c.name === country)
                .cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
      )}
      {city && (
        <div>
          <label>
            Location:
            <select value={location} onChange={handleLocationChange} required>
              <option value="">Select Location</option>
              {locationsData.countries
                .find((c) => c.name === country)
                .cities.find((c) => c.name === city)
                .locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
      )}
      {location && (
        <div>
          <label>
            Sub-Location:
            <select
              value={subLocation}
              onChange={(e) => setSubLocation(e.target.value)}
            >
              <option value="">Select Sub-Location</option>
              {locationsData.countries
                .find((c) => c.name === country)
                .cities.find((c) => c.name === city)
                .locations.find((l) => l.name === location)
                .sub_locations.map((subLocation) => (
                  <option key={subLocation.id} value={subLocation.name}>
                    {subLocation.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
      )}
      <button onClick={generateRandomItem}>Generate Random Item</button>
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Save
      </button>
    </div>
  );
};

export default AddItemPage;
