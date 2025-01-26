import { initialData } from "./seed";
import  prisma from '../lib/prisma';

async function main() {
  const { categories, products, users, countries } = initialData;
  // Borrar registros previos 
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //categories
  const categoriesData =  categories.map( name => ({name}));
  await prisma.category.createMany({
    data: categoriesData
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>) // <string=shirt, string=categoriaId>;
  
  // Products
  products.forEach(async(product) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {images, type, ...rest} = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()]

      }
    });

    //images

    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });
  });

  // Users
  await prisma.user.createMany({
    data: users
  });

  //countries
  await prisma.country.createMany({
    data: countries
  })
  console.log('Seed ejecutado correctamente')
};

(()=>{

  if ( process.env.NODE_ENV === 'production' ) return;

  main();
})();