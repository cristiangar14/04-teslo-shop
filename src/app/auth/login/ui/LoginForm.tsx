"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";


export const LoginForm = () => {
  const [message, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const router = useRouter();

  useEffect(() => {
    if (message === 'success') {
      router.push('/');
    }

  }, [message]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />
      { (message && message != 'success') && <div className="mb-2 flex">
        <IoInformationOutline size={5} className="text-red-500 w-5 h-5" />
        <p className="text-sm text-red-500">Credenciales invalidas</p>
      </div>}

      {isPending && <p className="text-yellow-500">Loading...</p>}

      <button 
        disabled={isPending}
        aria-disabled={isPending}
        type="submit" 
        className={clsx({
          "btn-primary": !isPending,
          "btn-disabled": isPending,
        }
        )}>
        Ingresar
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
