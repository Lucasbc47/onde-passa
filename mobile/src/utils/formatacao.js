export const formatarNota = (nota) => {
  if (!nota) {
    return "Sem nota";
  }
  return `★${nota.toFixed(1).replace(".", ",")}`;
};

export const formatarDuracao = (duracao) => {
  if (!duracao) {
    return null;
  }
  const horas = Math.floor(duracao / 60);
  const minutos = duracao % 60;
  const partes = [];
  if (horas > 0) {
    partes.push(`${horas}h`);
  }
  if (minutos > 0) {
    partes.push(`${minutos}min`);
  }
  return partes.join(" ");
};
