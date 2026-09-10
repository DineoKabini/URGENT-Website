"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  colour: string;
  size: string;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  loaded: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    id: string,
    colour: string,
    size: string
  ) => void;
  updateQuantity: (
    id: string,
    colour: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("urgent-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Could not load cart:", error);
    }

    setLoaded(true);
  }, []);

  // Save cart
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "urgent-cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart, loaded]);

  const addToCart = (item: CartItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.colour === item.colour &&
          cartItem.size === item.size
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.colour === item.colour &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + item.quantity,
              }
            : cartItem
        );
      }

      return [...currentCart, item];
    });
  };

  const removeFromCart = (
    id: string,
    colour: string,
    size: string
  ) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.colour === colour &&
            item.size === size
          )
      )
    );
  };

  const updateQuantity = (
    id: string,
    colour: string,
    size: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id &&
        item.colour === colour &&
        item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart after successful order
  const clearCart = () => {
    setCart([]);

    try {
      localStorage.removeItem("urgent-cart");
    } catch (error) {
      console.error("Could not clear cart:", error);
    }
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}