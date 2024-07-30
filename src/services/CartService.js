import api from './AuthService';

const getCart = async () => {
  const response = await api.get("api/cart/");
  console.log("CART => ", response)
  return response.data;
};

const addToCart = async (courseId) => {
  const response = await api.post("api/cart/", { course_id: courseId });
  return response.data;
};

const removeFromCart = async (cartId) => {
  const response = await api.delete(`api/cart/${cartId}/`);
  return response.data;
};

export { getCart, addToCart, removeFromCart };
