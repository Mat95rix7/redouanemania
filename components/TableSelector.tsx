import React from 'react';
import { cn } from '@/lib/utils';

interface TableSelectorProps {
  selectedTables: number[];
  onSelectTable: (table: number) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({ selectedTables, onSelectTable }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
        <button
          key={table}
          onClick={() => onSelectTable(table)}
          className={cn(
            "relative p-6 rounded-2xl transition-all duration-300",
            "transform hover:scale-105 active:scale-95",
            "border-2 shadow-lg",
            selectedTables.includes(table)
              ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white border-blue-400"
              : "bg-white/50 border-blue-200 hover:border-blue-300"
          )}
        >
          <div className="text-3xl font-bold">
             {table}
          </div>
          {selectedTables.includes(table) && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-1">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TableSelector;
