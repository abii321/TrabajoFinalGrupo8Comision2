import { useContext } from "react";
import { AuthContext } from "../context/AutorizacionesContext";

function useAuth(){
    const context=useContext(AuthContext);

    //asegurar que useAuth solo se utilice dentro del proveedor AuthProvider
    if(context === null){
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}

export default useAuth;