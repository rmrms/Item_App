import { useItems } from "../context/ItemContext";
import Updates from "../pages/Updates";
import "../styles/dashboard/style.css";

const Dashboard = () => {
  const { items } = useItems();
  const totalItems = items.length;
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const ItemCard = ({ name, quantity, location }) => (
    <div className="item-card">
      <p><strong>{name}</strong></p>
      <p>Quantity: {quantity}</p>
      <p>
        Location:{" "}
        {location ? (
          <>
            {location.country}, {location.city}, {location.storage}
          </>
        ) : (
          "Unknown Location"
        )}
      </p>
    </div>
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-summary">
          <p><strong>Total items:</strong> {totalItems}</p>
          <p><strong>Total value:</strong> ${totalValue.toFixed(2)}</p>
        </div>
      </header>

      <Updates />

      <section className="dashboard-section">
        <h2>Recent Items</h2>
        {totalItems === 0 ? (
          <p>No items available. Please add one!</p>
        ) : (
          <div className="grid-layout">
            {items.slice(-5).map((item) => (
              <ItemCard
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                location={item.location}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
