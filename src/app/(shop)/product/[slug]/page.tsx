export const revalidate = 604800;

import { titleFont } from "@/config/font";
import { notFound } from "next/navigation";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/components'
import { getProductBySlug } from "@/actions";

interface Props {
  params: Promise<{ slug: string }>  
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
        {/* tallas */}
        <SizeSelector
          seletedSize={product.sizes[0]}
          availableSize={product.sizes} />
        {/* cantidad */}
        <QuantitySelector quantity={2}/>
        {/* boton */}
        <button className="btn-primary my-5">
          Agregr al carrito
        </button>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}