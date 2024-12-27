import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemProvider } from "./context/ItemContext";
import Dashboard from "./components/Dashboard";
import Items from "./components/Items";
import Search from "./components/Search";
import ItemPage from "./pages/ItemPage";
import AddItemPage from "./pages/AddItemPage";
import Notifications from "./components/Notifications";

function App() {
  return (
    <ItemProvider>
      <Router>
        <div className="app">
          <nav>
            <a href="/">Dashboard</a>
            <a href="/items">Items</a>
            <a href="/search">Search</a>
            <a href="/notifications">Notifications</a>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<ItemPage />} />
            <Route path="/add-item" element={<AddItemPage/>}/>
            <Route path="/search" element={<Search />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </Router>
    </ItemProvider>
  );
}

export default App;
