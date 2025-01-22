import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity
  // removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      //methods
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        const productInCart = cart.some(
          (item: CartProduct) =>
            item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({
          cart: updatedCartProducts,
        });
      },
    }),
    {
      name: "shopping-cart",
      
    }
  )
);
