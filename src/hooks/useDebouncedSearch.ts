import { useEffect, useState } from 'react';

export function useDebouncedSearch(initialValue = '', delay = 600) {
  const [search, setSearch] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

  const isSearching = search !== debouncedSearch;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search, delay]);

  const clearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
  };

  return {
    search,
    setSearch,
    debouncedSearch,
    isSearching,
    clearSearch,
  };
}