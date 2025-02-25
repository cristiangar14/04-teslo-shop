import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  setAddress: (address: Address) => void;
}

export const useAddresStore = create<State>()(
  persist(
    (set) => ({
      address: {
        lastName: "",
        firstName: "",
        postalCode: "",
        city: "",
        country: "",
        rememberAddress: false,
        phone: "",
        address: "",
      },
      setAddress: (address) => {
        set({ address });
      },
    }),
    { name: "address-storage" }
  )
);
