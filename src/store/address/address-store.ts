import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    rememberAddress: boolean;
  };
  setAddress: (address: State["address"]) => void;
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
