export const formatarNota = (nota) => {
  if (!nota) {
    return "Sem nota";
  }
  return `★${nota.toFixed(1).replace(".", ",")}`;
};
