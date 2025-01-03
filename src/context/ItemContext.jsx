import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { createContext, useState, useContext, useEffect } from "react";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const [updates, setUpdates] = useState(() => {
    const savedUpdates = localStorage.getItem("transactions");
    return savedUpdates ? JSON.parse(savedUpdates) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(updates));
  }, [updates]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const savedUpdatedItems = localStorage.getItem("updatedItems");
  const initialUpdatedItems = savedUpdatedItems
    ? JSON.parse(savedUpdatedItems)
    : [];
  const [updatedItems, setUpdatedItems] = useState(initialUpdatedItems);
  useEffect(() => {
    localStorage.setItem("updatedItems", JSON.stringify(updatedItems));
  }, [updatedItems]);

  const addNotification = (message, details = null) => {
    console.log("Adding notification:", { message, details });
    const newNotification = {
      message,
      date: new Date().toLocaleString(),
      details,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (notificationToRemove) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification !== notificationToRemove)
    );
  };

  const addItem = async (newItem) => {
    try {
      const docRef = await addDoc(collection(db, "items"), newItem);
      setItems((prevItems) => [...prevItems, { id: docRef.id, ...newItem }]);
      addNotification(`New item added: ${newItem.name}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    const itemExists = items.some((item) => item.name === newItem.name);

    if (itemExists) {
      addNotification(`Item name already exists: ${newItem.name}`);
      return;
    }

    const itemWithId = {
      ...newItem,
      id: Date.now(),
      lastUpdated: new Date().toLocaleString(),
    };
    setItems((prevItems) => [...prevItems, itemWithId]);
    addNotification(`New item added: ${newItem.name}`);
  };

  const deleteItem = (id) => {
    // setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    // addNotification(`Item deleted: ${id}`);

    const deleteItem = async (id) => {
      try {
        await deleteDoc(doc(db, "items", id));
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        addNotification(`Item deleted: ${id}`);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    };
  };

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const loadedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(loadedItems);
    };

    fetchItems();
  }, []);

  const updateItemLocation = (itemId, newLocation) => {
    const timestamp = new Date().toLocaleString();
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === parseInt(itemId, 10)
          ? { ...item, location: newLocation, lastUpdated: timestamp }
          : item
      )
    );
    setUpdatedItems((prevUpdated) =>
      prevUpdated.some((item) => item.id === parseInt(itemId, 10))
        ? prevUpdated
        : [...prevUpdated, { id: itemId, type: "location" }]
    );
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    const timestamp = new Date().toLocaleString();
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === parseInt(itemId, 10)
          ? { ...item, quantity: newQuantity, lastUpdated: timestamp }
          : item
      )
    );
    const updatedItem = items.find((item) => item.id === parseInt(itemId, 10));
    if (updatedItem) {
      addNotification(
        `Item quantity updated: ${updatedItem.name}`,
        `New quantity: ${newQuantity}`
      );
    }
    setUpdatedItems((prevUpdated) =>
      prevUpdated.some((item) => item.id === parseInt(itemId, 10))
        ? prevUpdated
        : [...prevUpdated, { id: itemId, type: "quantity" }]
    );
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        updatedItems,
        addItem,
        deleteItem,
        updateItemLocation,
        updateItemQuantity,
        notifications,
        removeNotification,
        transactions: updates,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemContext);
};
