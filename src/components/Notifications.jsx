import { useItems } from "../context/ItemContext";

const Notifications = () => {
  const { notifications } = useItems();

  if (!notifications || notifications.length === 0) {
    return <p>No notifications available.</p>;
  }

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;