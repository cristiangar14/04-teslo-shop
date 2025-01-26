'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {

    const existUser = await prisma.userAddress.findFirst({
      where: {
        userId
      }
    })

    if (!existUser) {
      return {
        ok: false,
        message: 'no fue posible eliminar la direccion'
      }
    }
    
    const deletedAddress = await prisma.userAddress.delete({
      where: {
        userId
      }
    });

    if (deletedAddress) {
      return {
        ok: true
      }
    }

    return {
      ok: false,
      message: 'no fue posible eliminar la direccion'
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'no fue posible eliminar la direccion'
    }
  }
}