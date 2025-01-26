'use server';

import { Country } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getAllCountries = async():Promise<Country[]> => {
  try {
    const countries = await prisma.country.findMany();

    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
}