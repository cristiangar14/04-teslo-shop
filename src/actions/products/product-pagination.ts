'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?:number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1, 
  take = 12,
  gender
}:PaginationOptions ) => {
  if( isNaN(Number(page)) ) page = 1;
  if( page < 1 ) page = 1;
  if( isNaN(Number(take)) ) take = 12;
  if( take < 1 ) take = 12;
  
  
  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      where: {
        gender
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    });

    // obtener el total de paginas
    // todo: implementar filtros
    const  totalCount = await prisma.product.count({
      where: {
        gender
      },
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(totalCount / take),
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url)
      })),
    }
  } catch (e) {
    console.error(e);
    throw new Error(`error`);
  }
}