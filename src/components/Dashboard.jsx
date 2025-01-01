import { useItems } from "../context/ItemContext";
import Updates from "../pages/Updates";

const Dashboard = () => {
  const { items } = useItems();
  const totalItems = items.length;
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <p>Total items: {totalItems}</p>
        <p>Total value: {totalValue.toFixed(2)}</p>
      </header>

      <Updates />

      <h2>Recent Items</h2>
      {totalItems === 0 ? (
        <p>No items available. Please add one!</p>
      ) : (
        <section className="grid-layout">
          {items.slice(-5).map((item) => (
            <div key={item.id} className="item-card">
              {item.name} - Quantity: {item.quantity} - Location:{" "}
              {item.location ? (
                <>
                  {item.location.country}, {item.location.city},{" "}
                  {item.location.storage}
                </>
              ) : (
                "Unknown Location"
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Dashboard;
