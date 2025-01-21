'use server';

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug
      },
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      }
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const { ProductImage, ...rest } = product;

    return {
      ...rest,
      images: ProductImage.map((image: {url:string}) => image.url)
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el producto por slug');
  }
}