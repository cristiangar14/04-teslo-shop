'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  productSize: Size;
}

export const placeOrder = async( cartProducts: ProductToOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'Usuatio no esta logueado'
    }
  }

  try {

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: cartProducts.map(p => p.productId)
        } 
      }
    });


    //calcular los montos 

    const itemsInOrder = cartProducts.reduce((count, p) => count + p.quantity ,0);

    //totales
    



    console.log({itemsInOrder, products, address, userId})
  } catch (error) {
    console.log(error);
    return {
      ok:false,
      message: 'error en el place order'
    }
  }
}