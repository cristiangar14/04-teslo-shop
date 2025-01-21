import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title, Pagination } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
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
