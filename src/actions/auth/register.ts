"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export const registerUser = async ({ name, email, password }: RegisterData) => {
  try {

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })
 
    if (existingUser) {
      throw new Error('El usuario ya existe')
    }
 
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      message: "User created successfully",
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Something went wrong.",
    };
  }
};
