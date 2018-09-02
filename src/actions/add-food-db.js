export default function addFoodDB(name, newProduct) {
  return {
    type: 'ADD_NEW_PRODUCT',
    name: name,
    newProduct: newProduct
  };
}
