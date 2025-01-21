export const revalidate = 60;
import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title, Pagination } from "@/components";

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: Props) {
  const searchParamsProp = await searchParams;
  const page = await searchParamsProp?.page ? parseInt(searchParamsProp?.page ?? '1') : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({page}); 

  if ( !products.length ) {
    redirect('/'); 
  }

  return (
      < >
        <Title
          title="Tienda"
          subtitle="Todos los productos"
          className="mb-2"
        />

        <ProductGrid products={products} />
        <Pagination
          totalPages={totalPages}
        />
      </>
    
  );
}
