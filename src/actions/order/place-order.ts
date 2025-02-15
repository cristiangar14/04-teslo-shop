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
    const {subTotal, tax, total} = cartProducts.reduce((totals, item) => {

      const productQuantity = item.quantity;
      const product = products.find(product => product.id === item.productId);

      if (!product) {
        throw new Error(`${item.productId} no existe - 500`)
      }

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      console.log({subTotal})

      return totals;
    }, { subTotal: 0, tax: 0, total:0 })

    console.log({subTotal, tax, total, itemsInOrder})

  } catch (error) {
    console.log(error);
    return {
      ok:false,
      message: 'error en el place order'
    }
  }
}