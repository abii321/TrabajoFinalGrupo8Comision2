import { createContext, useContext, useState } from "react";

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleTema = () => setModoOscuro(prev => !prev);

  return (
    <TemaContext.Provider value={{ modoOscuro, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);