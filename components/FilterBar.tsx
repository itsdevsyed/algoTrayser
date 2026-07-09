"use client";

import { Search, Filter, ChevronDown } from "lucide-react";

type TabType = "all" | "blind75" | "neetcode150" | "custom";

interface FilterBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (d: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  availableCategories: string[];
  totalProblems: number;
}

export default function FilterBar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  difficultyFilter,
  setDifficultyFilter,
  categoryFilter,
  setCategoryFilter,
  availableCategories,
  totalProblems,
}: FilterBarProps) {
  return (
    <div className="sticky top-4 z-30 bg-neutral-50/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-transparent sm:border-none">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

        {/* Tabs */}
        <div className="flex p-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-x-auto no-scrollbar shadow-sm">
          {(["all", "blind75", "neetcode150", "custom"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              {tab === "all" ? "All Problems" :
               tab === "blind75" ? "Blind 75" :
               tab === "neetcode150" ? "NeetCode 150" : "My List"}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-8 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative group">
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>

          <div className="relative group">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors max-w-[150px]"
            >
              <option value="all">All Categories</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-4 flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        <span>{totalProblems} problems found</span>
      </div>
    </div>
  );
}
