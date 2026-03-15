"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Debounce hook for search optimization
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  filters?: FilterConfig[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
  loading?: boolean;
  pageSize?: number;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  filters = [],
  searchable = false,
  searchPlaceholder = "Search...",
  selectable = false,
  onRowClick,
  onSelectionChange,
  loading = false,
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query for performance (300ms delay)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search with debounced value
    if (debouncedSearchQuery && searchable) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value && value !== "all") {
        result = result.filter((row) => String(row[key]) === value);
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, debouncedSearchQuery, filterValues, sortConfig, searchable]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = paginatedData.map((_, index) => (currentPage - 1) * pageSize + index);
      setSelectedRows(new Set(allIndices));
      onSelectionChange?.(paginatedData);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    
    const selectedData = Array.from(newSelected).map((i) => filteredData[i]);
    onSelectionChange?.(selectedData);
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-2 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-2" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-2" />
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filters */}
      {(searchable || filters.length > 0) && (
        <div className="flex flex-wrap gap-4" role="search" aria-label="Filter and search options">
          {searchable && (
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/20"
                  aria-label="Search table data"
                />
              </div>
            </div>
          )}
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={filterValues[filter.key] || "all"}
              onValueChange={(value) =>
                setFilterValues((prev) => ({ ...prev, [filter.key]: value }))
              }
            >
              <SelectTrigger 
                className="w-[180px] bg-white/5 border-white/10 focus:ring-4 focus:ring-amber-500/20"
                aria-label={`Filter by ${filter.label}`}
              >
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      )}

      {/* Table */}
      <GlassCard className="overflow-hidden" role="region" ariaLabel="Data table">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Data table with sortable columns">
            <thead>
              <tr className="border-b border-white/10">
                {selectable && (
                  <th className="p-4 text-left w-12" scope="col">
                    <Checkbox
                      checked={
                        paginatedData.length > 0 &&
                        paginatedData.every((_, index) =>
                          selectedRows.has((currentPage - 1) * pageSize + index)
                        )
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all rows on current page"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "p-4 text-left text-sm font-semibold text-gray-300",
                      column.width
                    )}
                    scope="col"
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(column.key)}
                        className="flex items-center hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded px-1"
                        aria-label={`Sort by ${column.header}${
                          sortConfig?.key === column.key
                            ? `, currently sorted ${sortConfig.direction === "asc" ? "ascending" : "descending"}`
                            : ""
                        }`}
                      >
                        {column.header}
                        {getSortIcon(column.key)}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Loading skeleton
                Array.from({ length: pageSize }).map((_, index) => (
                  <tr key={index} className="border-b border-white/5">
                    {selectable && (
                      <td className="p-4">
                        <div className="h-4 w-4 bg-white/5 rounded animate-pulse" aria-hidden="true" />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className="p-4">
                        <div className="h-4 bg-white/5 rounded animate-pulse" aria-hidden="true" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="p-8 text-center text-gray-400"
                    role="cell"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const globalIndex = (currentPage - 1) * pageSize + rowIndex;
                  const isClickable = !!onRowClick;
                  
                  const rowProps = {
                    key: globalIndex,
                    className: cn(
                      "border-b border-white/5 transition-colors",
                      isClickable && "cursor-pointer hover:bg-white/5 focus-within:bg-white/5",
                      selectedRows.has(globalIndex) && "bg-amber-500/5"
                    ),
                    onClick: () => onRowClick?.(row),
                    onKeyDown: isClickable ? (e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onRowClick?.(row);
                      }
                    } : undefined,
                    ...(isClickable && { 
                      tabIndex: 0,
                      role: "button",
                      "aria-label": `View details for row ${rowIndex + 1}`
                    }),
                  };
                  
                  return (
                    <tr {...rowProps}>
                      {selectable && (
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedRows.has(globalIndex)}
                            onCheckedChange={(checked) =>
                              handleSelectRow(globalIndex, checked as boolean)
                            }
                            aria-label={`Select row ${rowIndex + 1}`}
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td key={column.key} className="p-4 text-sm text-gray-300">
                          {column.render
                            ? column.render(row[column.key], row)
                            : row[column.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div 
            className="flex items-center justify-between p-4 border-t border-white/10"
            role="navigation"
            aria-label="Table pagination"
          >
            <div className="text-sm text-gray-400" role="status" aria-live="polite">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, filteredData.length)} of{" "}
              {filteredData.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="bg-white/5 border-white/10 focus:ring-4 focus:ring-amber-500/50"
                aria-label="Go to first page"
              >
                <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-white/5 border-white/10 focus:ring-4 focus:ring-amber-500/50"
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <span className="text-sm text-gray-300 px-4" aria-current="page">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="bg-white/5 border-white/10 focus:ring-4 focus:ring-amber-500/50"
                aria-label="Go to next page"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="bg-white/5 border-white/10 focus:ring-4 focus:ring-amber-500/50"
                aria-label="Go to last page"
              >
                <ChevronsRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
