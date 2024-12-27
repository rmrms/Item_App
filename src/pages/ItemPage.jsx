import React, { useState } from "react";
import { useParams } from "react-router";
import { useItems } from "../context/ItemContext";

const ItemPage = () => {
  const { id } = useParams();
  const { items } = useItems();
  const item = items.find((i) => i.id === id);

  if (!item) {
    return <p>Item not found!</p>;
  }

  return (
    <div className="item-page">
      <header>
        <h1>{item.name}</h1>
        <p>Last updated: {item.lastUpdated}</p>
      </header>
      {/* Részletek itt... */}
    </div>
  );
};

export default ItemPage;
