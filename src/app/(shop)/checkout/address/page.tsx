import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getAllCountries, getUserAddress } from "@/actions";
import type { Country } from "@/interfaces";
import { auth } from "@/auth.config";

export default async function AddressPage() {
  const countries: Country[] = await getAllCountries();
  const session = await auth();

  if(!session?.user) {
    return (
      <h3 className="text-5xl">500 - No hay session de usuario</h3>
    )
  }

  const address = await getUserAddress(session.user.id) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoreAddres={address} />
      </div>
    </div>
  );
}
