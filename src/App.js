import { useState } from 'react';
import Header from './components/Header';
import MealsSummary from './components/Meals/MealsSummary';
import AvailableMeals from './components/Meals/AvailableMeals';
import Cart from './components/Cart';
import ContextProvider from './store/CartProvider';

function App() {
  const [showCartModal, setShowCartModal] = useState(false);

  function showCartHandler() {
    setShowCartModal(true);
  }

  function hideCartHandler() {
    setShowCartModal(false);
  }

  return (
    <ContextProvider>
      {showCartModal && <Cart hideCart={hideCartHandler} />}
      <Header showCart={showCartHandler} />
      <MealsSummary />
      <AvailableMeals />
    </ContextProvider>
  );
}

export default App;
