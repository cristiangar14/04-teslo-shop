export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {


  // Si el numero total de paginas es menor o igual a 7
  // Vamos a mostrar todas las paginas
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // sila pagina actual esta entre las primeras 3 paginas
  // mostrar las priemras 3, puntos suspensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // si laapgina actual esta entre las ultimas 3 paginas
  // mostrar las priemras 2, puntos suspensivos, y las ultimas 3
  if (currentPage > totalPages - 3) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // si la pagina actua esta en otro lugar medio
  // mostrar l aprimera pagina, puntos suspensivos, la pagina actual y vecinos 
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}