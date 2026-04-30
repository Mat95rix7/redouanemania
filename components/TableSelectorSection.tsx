import React from 'react';
import TableSelector from './TableSelector';
import { RefreshCw, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableSelectorSectionProps {
  selectedTables: number[];
  onSelectTable: (table: number) => void;
  onReset: () => void;
  onStartQuiz: () => void;
  isStartDisabled: boolean;
}

const TableSelectorSection: React.FC<TableSelectorSectionProps> = ({
  selectedTables,
  onSelectTable,
  onReset,
  onStartQuiz,
  isStartDisabled,
}) => (
  <>
    <div className="mb-8 animate-fade-in">
      <div className="relative">
        <h1 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sélectionne les tables à réviser
        </h1>
        <div className="absolute -top-4 -right-4 animate-bounce">
          <Sparkles className="h-8 w-8 text-yellow-400" />
        </div>
      </div>
      <p className="text-xl text-blue-600">
        Choisissez les tables de multiplication que vous voulez réviser !
      </p>
    </div>
    <div className="bg-white/80 rounded-3xl p-8 shadow-xl border-2 border-blue-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">
          Tables sélectionnées : {selectedTables.length}
        </h2>
        <button
          onClick={onReset}
          className={cn(
            "p-3 rounded-xl transition-all",
            "bg-red-50 text-red-500 hover:bg-red-100",
            "flex items-center gap-2 font-medium",
            "transform hover:scale-105 active:scale-95"
          )}
        >
          <RefreshCw className="h-5 w-5" />
          Réinitialiser
        </button>
      </div>
      <TableSelector
        selectedTables={selectedTables}
        onSelectTable={onSelectTable}
      />
    </div>
    <div className="mt-12 mb-8 flex justify-center animate-scale-in">
      <button
        onClick={!isStartDisabled ? onStartQuiz : undefined}
        className={cn(
          "py-5 px-8 rounded-2xl flex items-center gap-3 transition-all",
          !isStartDisabled
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 active:scale-95 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        )}
        disabled={isStartDisabled}
      >
        Commencer le quiz
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  </>
);

export default TableSelectorSection; 