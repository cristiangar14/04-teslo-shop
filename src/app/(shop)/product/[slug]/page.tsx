export const revalidate = 604800;

import type { Metadata } from 'next'

import { titleFont } from "@/config/font";
import { notFound } from "next/navigation";
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from '@/components'
import { getProductBySlug } from "@/actions";
import { AddTocart } from './iu/AddTocart';

interface Props {
  params: Promise<{ slug: string }>  
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
 
  // fetch data
  const product = await getProductBySlug(slug);
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'Este producto no se encuentra disponible',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'Este producto no se encuentra disponible',
      images: [`/products/${product.images[0]}`],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/**slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* mobile slideshow  */}

        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="md:hidden"
        />
        {/*Desktop slideshow  */}
        <ProductSlideshow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      {/**description */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        
        <AddTocart product={product}/>
        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}