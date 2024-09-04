import { useEffect, useState } from "react";

export type FiltersValue = string | number | boolean | string[] | number[];
export type FiltersType = "text" | "dict";
export type FiltersOption = {
  label: string;
  name: string;
  value: FiltersValue;
  type: FiltersType;
  dictKey?: string;
}

export function useFilter(initialFilters: FiltersOption[]) {
  const [filters, setFilters] = useState<FiltersOption[]>(initialFilters);

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => prevFilters.map((filter) => filter.name === name ? { ...filter, value } : filter));
  };

  const handleReset = () => {
    setFilters(initialFilters.map((filter) => ({ ...filter, value: filter.value })));
  };

  const getFilterWithRequest = (): Record<string, FiltersValue> => {
    return filters.reduce((acc, filter) => {
      acc[filter.name] = filter.value;
      return acc;
    }, {} as Record<string, FiltersValue>);
  };

  return { filters, handleFilterChange, handleReset, getFilterWithRequest };
}
