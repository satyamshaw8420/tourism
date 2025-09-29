import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useCreateUser = () => useMutation(api.users.createUser);
export const useGetUserByEmail = (email: string) => useQuery(api.users.getUserByEmail, { email });
export const useGetUserById = (id: any) => useQuery(api.users.getUserById, { id });