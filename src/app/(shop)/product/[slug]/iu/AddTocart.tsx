"use client";
import { SizeSelector, QuantitySelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddTocart = ({ product }: Props) => {
  const [size, setsSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    console.log("add to cart", { size, quantity });
  };

  return (
    <>
      {/* tallas */}
      {posted && !size && (
        <p className="mt-2 text-red-500">Selecciona una talla</p>
      )}
      <SizeSelector
        seletedSize={size}
        availableSize={product.sizes}
        onSizeChanged={setsSize}
      />
      {/* cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      {/* boton */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregr al carrito
      </button>
    </>
  );
};
