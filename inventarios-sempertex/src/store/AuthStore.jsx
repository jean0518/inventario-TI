import { useState } from "react";
import { create } from "zustand"
import { supabase } from "../index";
export const useAuthStore=create((set, get) => ({
    signInWithEmail: async (p) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: p.correo,
            password: p.pass
        })
        if(error){
            return null;
        }
    },
    singOut: async () => {
        const { error } = await supabase.auth.singOut()
        if (error)
        throw new Error("A ocurrido un error durante el cierre de sesion" + error)
    }
}))