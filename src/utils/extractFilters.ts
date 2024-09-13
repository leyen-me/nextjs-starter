export type Filters = {
  [key: string]: any;
};

export const extractFiltersWithPagination = <T extends Filters>(
  url: string,
  filterKeys: (keyof T)[]
) => {
  const { searchParams } = new URL(url);
  const filters: Partial<T> = {};

  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  filterKeys.forEach((key) => {
    const value = searchParams.get(key as string);
    if (value) {
      filters[key] = value as any;
    }
  });

  return { page, pageSize, filters };
};

export const extractFiltersWithoutPagination = <T extends Filters>(
  url: string,
  filterKeys: (keyof T)[]
) => {
  const { searchParams } = new URL(url);
  const filters: Partial<T> = {};

  filterKeys.forEach((key) => {
    const value = searchParams.get(key as string);
    if (value) {
      filters[key] = value as any;
    }
  });

  return { filters };
};
