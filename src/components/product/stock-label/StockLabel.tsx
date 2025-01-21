'use client';
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/font";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getStock();
  },[]);
  
  const getStock = async () => { 
    const stock = await getStockBySlug(slug);
    setStock(stock);
    setIsLoading(false);
   };

  return (
    <> 
      {
        isLoading ? 
        <h2 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
            &nbsp;
      </h2> 
      : <h2 className={`${titleFont.className} antialiased font-bold text-lg`}>
            Stock: { stock }
      </h2>
      }
      
      
    </>
  )
}
