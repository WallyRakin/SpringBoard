import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Burger from './Burger'
import Candy from './Candy'
import Chips from './Chips'
import Fries from './Fries'
import Pizza from './Pizza'
import Soda from './Soda'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/burger" element={<Burger />} />
      <Route path="/candy" element={<Candy />} />
      <Route path="/chips" element={<Chips />} />
      <Route path="/fries" element={<Fries />} />
      <Route path="/pizza" element={<Pizza />} />
      <Route path="/soda" element={<Soda />} />
    </Routes>
  );
}

export default App;