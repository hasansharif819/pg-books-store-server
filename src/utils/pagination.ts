export const getPagination = (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return { offset, limit };
};

export const getPagingData = (data: any, page: number, limit: number) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page || 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};
