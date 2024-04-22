import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import Menu from "./FoodMenu";
import FoodItem from "./FoodItem";
import AddItems from "./AddItems";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);



  useEffect(() => {
    async function getSnacks() {
      const snacks = await SnackOrBoozeApi.getSnacks();
      setSnacks(snacks);
      setIsLoading(false);
      const drinks = await SnackOrBoozeApi.getDrinks();
      setDrinks(drinks);
    }
    getSnacks();
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home snacks={snacks} />} />
            <Route path="/snacks" element={<Menu items={snacks} title="Snacks" />} />
            <Route path="/snacks/:id" element={<FoodItem items={snacks} cantFind="/snacks" />} />
            <Route path="/drinks" element={<Menu items={drinks} title="Drinks" />} />
            <Route path="/drinks/:id" element={<FoodItem items={drinks} cantFind="/drinks" />} />
            <Route path="/addItems" element={<AddItems snacks={snacks} drinks={drinks} setSnacks={setSnacks} setDrinks={setDrinks} />} />
            <Route path="*" element={<p>Hmmm. I can't seem to find what you want.</p>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;