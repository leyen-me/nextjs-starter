import { useState } from "react";

export function useFilter<T>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as keyof T]: value,
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  return { filters, handleFilterChange, handleReset };
}
