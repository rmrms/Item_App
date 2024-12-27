import React from "react";
import { useItems } from "../context/ItemContext";

const Dashboard = () => {
  const { items } = useItems(); // Hozzáférés az elemekhez a kontextusból
  const totalItems = items.length; // Az összes elem száma
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ); // Teljes érték

  return (
    <div className="dashboard">
      <h1>Inventory Summary</h1>
      <p>Total items: {totalItems}</p>
      <p>Total value: ${totalValue.toFixed(2)}</p>

      <h2>Transaction Tracker</h2>
      {/* Hely a tranzakciófigyelőnek */}

      <h2>Recent Items</h2>
      <ul>
        {items.slice(-5).map(
          (
            item // Az utolsó 5 elem
          ) => (
            <li key={item.id}>{item.name}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
