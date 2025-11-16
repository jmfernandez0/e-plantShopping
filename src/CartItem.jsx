import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach(item => {
      const quantity = item.quantity || 0;
      // cost is a string like "$15" -> remove "$" and parse the number
      const costNumber = parseFloat(item.cost.toString().substring(1)) || 0;
      total += quantity * costNumber;
    });

    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
        onContinueShopping(e);            // Call parent function passed as prop
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert("Coming Soon");
    };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1   // Increase quantity by 1
    }));
  };
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrease quantity by 1
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      // Quantity would drop to 0 → remove item
      dispatch(removeItem(item.name));
    }
  };
  
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));   // Remove plant based on its name
  };
  
  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const quantity = item.quantity || 0;
  
    // Convert cost string like "$15" → 15
    const unitPrice = parseFloat(item.cost.substring(1));
  
    const subtotal = quantity * unitPrice;
  
    return subtotal.toFixed(2);   // Return subtotal with two decimals
  };
  


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button 
            className="get-started-button1"
            onClick={handleCheckoutShopping}
            >
            Checkout
        </button>

      </div>
    </div>
  );
};

export default CartItem;


