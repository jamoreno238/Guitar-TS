import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db.js";
import type { Guitar, CarItem } from "../types/types.js";

const useCart = () => {
  const initialCart = (): CarItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      console.log("ya existe");
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      // console.log(" no existe agregando");
      const newItem: CarItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeFromCart(id: Guitar["id"]) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    console.log("Eliminando", id);
  }

  function increaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id: Guitar["id"]) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          if (item.quantity > MIN_ITEMS) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            removeFromCart(id);
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  //State Derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const carTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    carTotal,
  };
};

export { useCart };
