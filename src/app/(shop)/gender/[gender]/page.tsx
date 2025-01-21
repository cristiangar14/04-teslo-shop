// import { notFound } from "next/navigation";
export const revalidate = 60;
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {  
  params: Promise<{ gender: string }>  
  searchParams: Promise<{ page?: string }>
  } 

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;
  const { products, totalPages } =
    await getPaginatedProductsWithImages({ page: Number(page), gender: gender as Gender });

  if (!products.length) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "todos",
  };
  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos para ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
