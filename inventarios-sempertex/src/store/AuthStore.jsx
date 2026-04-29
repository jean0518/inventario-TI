import { create } from "zustand"
import { supabase, useCategoriasStore, useEmpresaStore, useMarcaStore, useProductosStore, useUsuariosStore } from "../index";
import { queryClient } from "../main";
export const useAuthStore=create(() => ({
    signInWithEmail: async (p) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: p.correo,
            password: p.pass
        });
        if(error){
            return null;
        }
        return data.user;
    },
    signOut: async () => {
        try{
            useUsuariosStore.getState().reset();
            useProductosStore.getState().reset();
            useCategoriasStore.getState().reset();
            useMarcaStore.getState().reset();
            useEmpresaStore.getState().reset();

            queryClient.clear();

            const { error } = await supabase.auth.signOut();
            if (error) {
                throw new Error("Error durante el cierre de sesión: " + error.message);
            }

           return true;
        }catch(error){
            console.error("Error en signOut:", error);
            throw error;
        }
    }
}))