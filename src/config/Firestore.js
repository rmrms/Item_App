import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Firestore = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    setData(users);
  };

  const addUser = async () => {
    try {
      await addDoc(collection(db, "users"), { name: "New User", age: 25 });
      fetchData();
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div>
      <button onClick={addUser}>Add User</button>
      <button onClick={fetchData}>Fetch Data</button>
      <ul>
        {data.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Firestore;
