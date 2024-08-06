import api from './AuthService';

const getCart = async () => {
  const response = await api.get("api/cart/");
  console.log("CART => ", response)
  return response.data;
};

const purchaseCourse = async (courseId, proofOfPurchaseFile) => {
  const formData = new FormData();
  formData.append('course_id', courseId);
  formData.append('proof_of_purchase', proofOfPurchaseFile);

  const purchaseResponse = await api.post('api/purchase/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Assuming the backend handles the cart removal when a purchase is made,
  // or else, manually remove the cart item
  return purchaseResponse.data;
};

const getPurchasedCourses = async () => {
  const response = await api.get("api/purchase/");
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

export { getCart, addToCart, removeFromCart, purchaseCourse, getPurchasedCourses };
