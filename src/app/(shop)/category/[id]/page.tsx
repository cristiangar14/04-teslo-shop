// import { notFound } from "next/navigation";

import { ProductGrid, Title } from "@/components";
import { Product, Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

interface Props {
  params: {
    id: Category;
  }
}

const seedProducts: Product[] = initialData.products;
export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const products: Product[] = seedProducts.filter(product => product.gender === id)


  const labels: Record<Category, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'todos'

  }
  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    < >
        <Title
          title={`Articulos para ${labels[id]}`}
          subtitle="Todos los productos"
          className="mb-2"
        />

        <ProductGrid products={products} />
      </>
  );
}