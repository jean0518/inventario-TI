import { create } from "zustand"

export const useUusariosStore = create((set,get) => ({
    insertarUsuarioAdmin: async (p) => {
        await supabase.auth.signUp({
            email: p.correo,
            password: p.pass,
        })
    }
}))