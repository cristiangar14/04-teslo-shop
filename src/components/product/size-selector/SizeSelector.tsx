import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
  seletedSize: Size;
  availableSize: Size[]
}
export const SizeSelector = ({ seletedSize, availableSize }: Props) => {

  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {
          availableSize.map(size => (
            <button key={size} className={clsx(
              "mx-2 hover:underline text-lg",
              {
                'underline': size === seletedSize
              }
            )}>
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}
