import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  cartItems: [],
  addToCartItem: () => {},
  removeFromCart: () => {},
  clearCartItem: () => {},
  cartTotal: 0,
});

export const toClearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setcartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const addToCartItem = (productToAdd) =>
    setcartItems(addCartItem(cartItems, productToAdd));

  const removeFromCart = (productToRemove) =>
    setcartItems(removeCartItem(cartItems, productToRemove));

  const clearCartItem = (productToRemove) => {
    setcartItems(toClearCartItem(cartItems, productToRemove));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartCount);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCartItem,
    removeFromCart,
    clearCartItem,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
