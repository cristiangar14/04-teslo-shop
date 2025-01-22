"use client";
import { SizeSelector, QuantitySelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddTocart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setsSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    
    setPosted(false);
    setsSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {/* tallas */}
      {posted && !size && (
        <p className="mt-2 text-red-500 fade-in">Selecciona una talla</p>
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
