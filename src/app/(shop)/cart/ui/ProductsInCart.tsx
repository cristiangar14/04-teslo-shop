'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { QuantitySelector } from "@/components";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import Link from "next/link";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

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
            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
              <span>{product.size} - {product.title}</span>
            </Link>
            <p>${product.price.toFixed(2)}</p>
            <QuantitySelector quantity={product.quantity} onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}/>

            <button onClick={() => removeProduct(product)} className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
