"use client";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen: boolean = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu: () => void = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  const onLogout = async () => {
    await logout({});
    closeSideMenu();
    window.location.reload();
  };

  return (
    <div className="">
      {/*Background black*/}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
        ></div>
      )}

      {/*Background blur*/}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        ></div>
      )}
      {/*Sidemenu*/}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />
        {/*Input*/}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
            name=""
            id=""
          />
        </div>
        {isAuthenticated && (
          <>
            <Link
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              href={"/profile"}
              onClick={closeSideMenu}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              href={"/"}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={() => onLogout()}
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={30} />

            <span className="ml-3 text-xl">Salir</span>
          </button>
        ) : (
          <Link
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            href={"/auth/login"}
            onClick={closeSideMenu}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/*Line Separator */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              href={"/"}
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              href={"/"}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              href={"/"}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
