import { useEffect, useState, useMemo } from "react";
import { CartItem, Guitar, GuitarID } from "../types";

export const useCart = () => {
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  function addToCart(guitar : Guitar) {
    const itemExists = cart.findIndex((cartItem) => cartItem.id === guitar.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;

      const updatedCart = [...cart]; // se crea una copia del carrito
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
      return;
    }
    const newItem = { ...guitar, quantity : 1}
    setCart([...cart, newItem]);
  }

  function removeFromCart(id : GuitarID) {
    const updatedCart = cart.filter((guitar) => guitar.id !== id);
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  function increaseQuantity(id : GuitarID) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1,
        };
      }
      return guitar;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id : GuitarID) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1,
        };
      }
      return guitar;
    });

    setCart(updatedCart);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    isEmpty,
    cartTotal,
  };
};
