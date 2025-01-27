'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const ProductsInCartCheckout = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando...</p>;

  return (
    <>
      {productsInCart.map((product: CartProduct) => (
        <div className="flex mb-5" key={`${product.slug}-${product.size}`}>
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded h-[100px]"
          />
          <div className="">
            
            <span>{product.size} - {product.title} ({ product.quantity})</span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>

          </div>
        </div>
      ))}
    </>
  );
};
