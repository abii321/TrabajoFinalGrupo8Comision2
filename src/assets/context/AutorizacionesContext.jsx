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

    const login = useCallback( (credentials) => {
        setIsLoading(true); // se activa brevemente, luego se desactiva
        try{
            const usuarioEncontrado = userData.find(
                u=> u.username === credentials.username && u.passwd == credentials.passwd
            );

            if(usuarioEncontrado){
                const { passwd, ...userWhitoutPasswd } = usuarioEncontrado; 
                setUser(userWhitoutPasswd);
                localStorage.setItem("user", JSON.stringify(userWhitoutPasswd));
                setIsLoading(false);
                return { success: true };
            }
            else {
                setUser(null);
                setIsLoading(false);
                return { success: false, message: 'Credenciales invalidas. Por favor, verifica los datos ingresados' };
            }
        } catch(error){
            console.error("Ingreso fallido debido a un error inesperado", error.message);
            setUser(null);
            setIsLoading(false);
            return { success: false, message: 'Ocurrio un error inesperado durante el login'}  
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