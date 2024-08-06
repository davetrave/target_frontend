import React, { useContext, useState } from 'react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import FileUploadPopup from './FileUploadPopup';
import { purchaseCourse } from '../services/CartService';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item, onRemove }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCheckoutPending, setCheckoutPending] = useState(false);
  const { removeFromCart, updatePurchasedCourses} = useContext(CartContext);


  const handleCheckoutClick = () => {
    setPopupOpen(true);
  };

  const handlePopupSubmit = async (file) => {
    if (file) {
      try {
        // Purchase the course
        await purchaseCourse(item.course.id, file);

        await updatePurchasedCourses()

        // Remove the course from the cart
        await removeFromCart(item.id);

        // Mark the button as pending
        setCheckoutPending(true);
        setPopupOpen(false);

        // Optionally, remove the item from the UI directly (if not handled by parent)
        // onRemove(item.id);
      } catch (error) {
        console.error('Failed to purchase course:', error);
      }
    } else {
      setPopupOpen(false);
    }
  };

  return (
    <div className="cart-item p-4 m-2 bg-gray-800 rounded-lg shadow-lg text-white w-full sm:w-1/2">
      <div className="flex items-center">
        <img
          src={item.course.img_url}
          alt={item.course.title}
          className="w-16 h-16 object-cover rounded-lg mr-4"
        />
        <span className="flex-grow">{item.course.title}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center text-red-500 hover:text-red-700"
        >
          <FaTrash className="mr-1" />
          <span>Remove</span>
        </button>
        <button
          className={`bg-${isCheckoutPending ? 'gray' : 'green'}-500 text-white px-3 py-1 rounded-lg flex items-center`}
          onClick={handleCheckoutClick}
          disabled={isCheckoutPending}
        >
          <FaShoppingCart className="mr-1" />
          {isCheckoutPending ? 'Pending' : 'Checkout'}
        </button>
      </div>
      <FileUploadPopup open={isPopupOpen} handleClose={() => setPopupOpen(false)} handleSubmit={handlePopupSubmit} />
    </div>
  );
};

export default CartItem;
