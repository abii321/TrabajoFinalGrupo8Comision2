import { createContext, useState, useMemo, useCallback, Children } from "react";
import userData from '../data/usuarios.json'

// 1. Crea el contexto
export const AuthContext = createContext(null);

// 2. Componente Proveedor del Contexto de Autenticacion
export function AuthProvider({ children }){
    const [ user, setUser ] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [ isLoading, setIsLoading ] = useState(false);

    const login = useCallback((credentials) => {
        setIsLoading(true);

        try {
            const localUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const todosLosUsuarios = [...userData, ...localUsuarios];

            const usuarioEncontrado = todosLosUsuarios.find(
                u => u.username === credentials.username && u.passwd === credentials.passwd
            );

            if (usuarioEncontrado) {
                const { passwd, ...userSinPass } = usuarioEncontrado;
                setUser(userSinPass);
                localStorage.setItem("user", JSON.stringify(userSinPass));
                setIsLoading(false);
                return { success: true };
            } else {
                setUser(null);
                setIsLoading(false);
                return { success: false, message: 'Credenciales inválidas.' };
            }
        } catch (error) {
            console.error("Error inesperado en login:", error.message);
            setUser(null);
            setIsLoading(false);
            return { success: false, message: 'Error inesperado en login.' };
        }
    }, []);

    
    const logout = useCallback(()=>{
        localStorage.removeItem("user");
        setUser(null);
    }, []);


    const authContextValue = useMemo(()=>({
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
    }), [user, isLoading, login, logout]);


    //3. Proveer el valor del contexto a los hijos
    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}