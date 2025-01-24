'use server';

import { signOut } from "@/auth.config";

interface Props {
  redirectPath?: string;
}
export const logout = async ({redirectPath}:Props) => {
  await signOut({ redirectTo: redirectPath ?? '/' });
};