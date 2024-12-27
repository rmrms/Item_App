import { createContext, useState, useContext } from "react";

const ItemContext = createContext();

export const useItems = () => useContext(ItemContext);

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Sample Item 1",
      quantity: 10,
      price: 100,
      tags: ["tag1", "tag2"],
      notes: "This is a sample item.",
      lastUpdated: new Date().toLocaleString(),
    },
  ]);

  const [notifications, setNotifications] = useState([]);

  const addItem = (name) => {
    const newItem = {
      id: Math.random().toString(36).substring(7),
      name,
      quantity: Math.floor(Math.random() * 100),
      price: Math.floor(Math.random() * 500),
      tags: ["example", "sample"],
      notes: "Sample note",
      lastUpdated: new Date().toLocaleString(),
    };
    setItems((prev) => [...prev, newItem]);
    setNotifications((prev) => [
      ...prev,
      { message: `New iem added: ${newItem.name}` },
    ]);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, notifications }}>
      {children}
    </ItemContext.Provider>
  );
};
