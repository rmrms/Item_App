import { useState, useEffect } from "react";
import { useItems } from "../context/ItemContext";
import "../styles/notifications/style.css";

const Notifications = () => {
  const { notifications, removeNotification } = useItems();
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    const sortedNotifications = [...notifications].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    setVisibleNotifications(sortedNotifications);
  }, [notifications]);

  const handleDelete = (index) => {
    const notificationToDelete = visibleNotifications[index];
    removeNotification(notificationToDelete);
    setVisibleNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <ul>
        {visibleNotifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <strong>{notification.message}</strong> - {notification.date}
            {notification.details && (
              <div>
                <strong>Details:</strong> {notification.details}
              </div>
            )}
            <button
              onClick={() => handleDelete(index)}
              className="delete-notification-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
