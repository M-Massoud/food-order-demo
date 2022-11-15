import { useEffect, useState } from 'react';
import MealItem from '../MealItem';
import styles from './AvailableMeals.module.css';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLodading, setIsLodaing] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const getMealsData = async function () {
      try {
        const response = await fetch(process.env.REACT_APP_DATABASE_URL_MEALS);

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();

        const mealsData = [];
        for (let key in data) {
          mealsData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(mealsData);
        setIsLodaing(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLodaing(false);
      }
    };
    getMealsData();
  }, []);

  return (
    <div className={`${styles.meals} ${styles.card} `}>
      {isLodading && <p>Lodaing...</p>}
      {httpError && <p>{httpError}</p>}
      <ul>
        {meals.map(meal => {
          return (
            <MealItem
              id={`meal-${meal.id}`}
              key={meal.id}
              mealName={meal.name}
              description={meal.description}
              price={meal.price}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default AvailableMeals;
