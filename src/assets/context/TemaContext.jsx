// TemaContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    document.body.className = modoOscuro ? "tema-oscuro" : "tema-claro";
  }, [modoOscuro]);

  const toggleTema = () => {
    setModoOscuro(prev => !prev);
  };

  return (
    <TemaContext.Provider value={{ modoOscuro, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
