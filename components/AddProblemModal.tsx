"use client";

import { X } from "lucide-react";

interface Problem {
  title: string;
  difficulty: string;
  category: string;
  desc: string;
}

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  newProblem: Partial<Problem>;
  setNewProblem: (p: Partial<Problem>) => void;
  onAdd: () => void;
}

export default function AddProblemModal({ isOpen, onClose, newProblem, setNewProblem, onAdd }: AddProblemModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
          <h3 className="font-semibold text-neutral-900 dark:text-white">Add Custom Problem</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Title</label>
            <input
              autoFocus
              type="text"
              value={newProblem.title || ""}
              onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="e.g. 1. Two Sum"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              rows={3}
              value={newProblem.desc || ""}
              onChange={(e) => setNewProblem({ ...newProblem, desc: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              placeholder="Brief description of the problem..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Difficulty</label>
              <select
                value={newProblem.difficulty || "Easy"}
                onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5">Category</label>
              <input
                type="text"
                value={newProblem.category || ""}
                onChange={(e) => setNewProblem({ ...newProblem, category: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="e.g. Arrays"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            disabled={!newProblem.title || !newProblem.desc}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all"
          >
            Add Problem
          </button>
        </div>
      </div>
    </div>
  );
}
