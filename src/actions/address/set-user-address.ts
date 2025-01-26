"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo guardar la direccion",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {

    console.log(userId)
    const { country, ...rest } = address;
    const addressToSave = {
      ...rest,
      countryId: country,
      userId,
    };
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo guardar la direccion");
  }
};
