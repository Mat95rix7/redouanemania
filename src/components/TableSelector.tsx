
import React from 'react';
import { TableSelection } from '../context/GameContext';
import { cn } from '@/lib/utils';

interface TableSelectorProps {
  selectedTables: TableSelection;
  onSelectTable: (table: number) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({ selectedTables, onSelectTable }) => {
  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="w-full animate-scale-in">
      <h2 className="text-lg font-medium mb-4 text-center">Choisissez les tables</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => onSelectTable(table)}
            className={cn(
              "relative overflow-hidden h-20 rounded-xl font-display font-medium text-xl transition-all duration-300",
              "hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50",
              selectedTables.includes(table)
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-foreground border border-border/50"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5"></div>
            <span>{table}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        {selectedTables.length === 0 ? (
          <p>Sélectionnez au moins une table</p>
        ) : (
          <p>
            Tables sélectionnées: {selectedTables.sort((a, b) => a - b).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default TableSelector;
