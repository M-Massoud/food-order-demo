import { useRef, useState } from 'react';
import styles from './CheckoutForm.module.css';

const isEmpty = value => value.trim().length === 0;

const Checkout = props => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formValidity, setFormValidity] = useState({
    nameIsValid: true,
    streetIsValid: true,
    postalCodeIsValid: true,
    cityIsValid: true,
  });

  const submitHandler = event => {
    event.preventDefault();

    const enteredNameValue = nameInputRef.current.value;
    const enteredStreetValue = streetInputRef.current.value;
    const enteredPostalCodeValue = postalCodeInputRef.current.value;
    const enteredCityValue = cityInputRef.current.value;

    const nameInputIsValid = !isEmpty(enteredNameValue);
    const streetInputIsValid = !isEmpty(enteredStreetValue);
    const postalCodeInputIsValid = enteredPostalCodeValue.trim().length === 5;
    const cityInputIsValid = !isEmpty(enteredCityValue);

    setFormValidity({
      nameIsValid: nameInputIsValid,
      streetIsValid: streetInputIsValid,
      postalCodeIsValid: postalCodeInputIsValid,
      cityIsValid: cityInputIsValid,
    });

    const formIsValid =
      nameInputIsValid &&
      streetInputIsValid &&
      postalCodeInputIsValid &&
      cityInputIsValid;

    if (formIsValid === false) return;

    // submit the form
    props.onConfirm({
      userName: enteredNameValue,
      street: enteredStreetValue,
      postalCode: enteredPostalCodeValue,
      city: enteredCityValue,
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.nameIsValid && <p>please enter a valid name</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.streetIsValid && <p>please enter a valid street</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formValidity.postalCodeIsValid && (
          <p>please enter a valid postal code (5 digits long) </p>
        )}
      </div>

      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.cityIsValid && <p>please enter a valid city</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.hideCart}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
