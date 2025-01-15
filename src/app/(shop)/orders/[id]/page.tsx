

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string
  }
}

export default function OrderPage({ params }:Props) {
  const { id } = params;

  // TODO: varificar auth
  // Todo: redirect
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm.px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Ordern #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* cart */}

          <div className="flex flex-col mt-5">
          <div className={
            clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
              {
                "bg-red-500": false,
                "bg-green-500": true
              }
            )
          }>
            <IoCardOutline size={30} />
            <span className="mx-2">Pendiente de pago</span>
            <span className="mx-2">Pagada</span>
          </div>

          {/* items */}
          {
            productsInCart.map((product) => (
              <div className="flex mb-5" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded h-[100px]"
                />
                <div className="">
                  <p>{ product.title }</p>
                  <p>${ product.price.toFixed(2) } x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>

                </div>
              </div>
            ))
          }

          </div>

          {/* checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>
            <div className="mb-10 ">
              <p className="text-xl">nombre usuario</p>
              <p>direccion usuario</p>
              <p>Ciudad</p>
              <p>Telefono del usuario</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>no. Productos</span>
              <span className="text-right">3 articulos</span>


              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 15</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">$115</span>
            </div>
            <div className="mt-5 mb-2 w-full">

            <div className={
            clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
              {
                "bg-red-500": false,
                "bg-green-500": true
              }
            )
          }>
            <IoCardOutline size={30} />
            <span className="mx-2">Pendiente de pago</span>
            <span className="mx-2">Pagada</span>
          </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}