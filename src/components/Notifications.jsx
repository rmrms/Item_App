import { useState, useEffect } from "react";
import { useItems } from "../context/ItemContext";

const Notifications = () => {
  const { notifications, removeNotification } = useItems();
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  // Keep visibleNotifications in sync with notifications from context
  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const handleDelete = (index) => {
    const notificationToDelete = visibleNotifications[index];
    removeNotification(notificationToDelete); // Remove from context
    setVisibleNotifications((prev) => prev.filter((_, i) => i !== index)); // Update local state
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
