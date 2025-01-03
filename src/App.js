import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemProvider } from "./context/ItemContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./components/Dashboard";
import Items from "./components/Items";
import ItemPage from "./pages/ItemPage";
import Search from "./components/Search";
import AddItemPage from "./pages/AddItemPage";
import Notifications from "./components/Notifications";
import { Auth } from "../src/config/auth/auth";
import { db } from "./config/firebase";
import { getDocs } from "./config/firebase/firestore";
import "../src/styles/general/app.css";

function App() {
  return (
    <ItemProvider>
      <Router>
        <div className="app">
          <ErrorBoundary>
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/items" element={<Items />} />
                <Route path="/items/:id" element={<ItemPage />} />
                <Route path="/add-item" element={<AddItemPage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/notifications" element={<Notifications />} />
                <Auth />
              </Routes>
            </main>
          </ErrorBoundary>

          <nav className="navbar">
            <a href="/">Dashboard</a>
            <a href="/items">Items</a>
            <a href="/search">Search</a>
            <a href="/notifications">Notifications</a>
          </nav>
        </div>
      </Router>
    </ItemProvider>
  );
}

export default App;
