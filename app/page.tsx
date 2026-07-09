"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import blind75Data from "@/data/75-blind.json";
import neetcode150Data from "@/data/neetcode-150.json";

// Import our new components
import StatsHeader from "../components/StatsHeader";
import FilterBar from "../components/FilterBar";
import ProblemCard from "../components/ProblemCard";
import AddProblemModal from "../components/AddProblemModal";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  desc: string;
  source?: "blind75" | "neetcode150" | "custom";
}

type TabType = "all" | "blind75" | "neetcode150" | "custom";

export default function Home() {
  const searchParams = useSearchParams();

  // State
  const [activeTab, setActiveTab] = useState<TabType>((searchParams.get("tab") as TabType) || "all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [difficultyFilter, setDifficultyFilter] = useState<string>(searchParams.get("diff") || "all");
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("cat") || "all");

  const [customProblems, setCustomProblems] = useState<Problem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [newProblem, setNewProblem] = useState<Partial<Problem>>({
    title: "",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    desc: "",
  });

  // Load custom problems
  useEffect(() => {
    const saved = localStorage.getItem("customProblems");
    if (saved) setCustomProblems(JSON.parse(saved));
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Save custom problems
  useEffect(() => {
    localStorage.setItem("customProblems", JSON.stringify(customProblems));
  }, [customProblems]);

  // Helper to extract LeetCode number from title (e.g., "1. Two Sum" -> "1")
  const getProblemNumber = (title: string) => {
    const match = title.match(/^(\d+)\./);
    return match ? match[1] : title;
  };

  // Get all problems with metadata AND deduplicate for "All" tab
  const allProblems = useMemo(() => {
    const n150 = neetcode150Data.map((p: any) => ({ ...p, source: "neetcode150" as const }));
    const b75 = blind75Data.map((p: any) => ({ ...p, source: "blind75" as const }));
    const custom = customProblems.map((p: any) => ({ ...p, source: "custom" as const }));

    // Deduplication Logic for "All" tab:
    // We use a Map to ensure unique problems based on their LeetCode number.
    // Priority: NeetCode 150 > Blind 75 (since N150 usually has better descriptions/categories)
    const uniqueMap = new Map<string, Problem>();

    // 1. Add Blind 75 first
    b75.forEach((p: Problem) => {
      const num = getProblemNumber(p.title);
      if (!uniqueMap.has(num)) {
        uniqueMap.set(num, p);
      }
    });

    // 2. Add NeetCode 150 (overwrites Blind 75 if duplicate, giving N150 priority)
    n150.forEach((p: Problem) => {
      const num = getProblemNumber(p.title);
      uniqueMap.set(num, p);
    });

    // 3. Convert Map back to array and add custom problems
    const combinedUnique = Array.from(uniqueMap.values());

    // Note: Custom problems are handled separately in the filter logic below
    // because they don't have LeetCode numbers to dedupe against easily without more complex logic.
    // For now, we'll just merge them at the end of the "all" list.

    return [...combinedUnique, ...custom];
  }, [customProblems]);

  // Get unique categories
  const availableCategories = useMemo(() => {
    const cats = new Set(allProblems.map(p => p.category));
    return Array.from(cats).sort();
  }, [allProblems]);

  // Filter Logic
  const filteredProblems = useMemo(() => {
    let data: Problem[] = [];

    if (activeTab === "all") {
      data = allProblems;
    } else if (activeTab === "custom") {
      data = customProblems;
    } else if (activeTab === "blind75") {
      data = blind75Data as Problem[];
    } else {
      data = neetcode150Data as Problem[];
    }

    return data.filter((p: Problem) => {
      const matchesSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDiff = difficultyFilter === "all" || p.difficulty === difficultyFilter;
      const matchesCat = categoryFilter === "all" || p.category === categoryFilter;

      return matchesSearch && matchesDiff && matchesCat;
    });
  }, [activeTab, allProblems, customProblems, searchQuery, difficultyFilter, categoryFilter]);

  const addCustomProblem = () => {
    if (!newProblem.title || !newProblem.desc) return;

    const problem: Problem = {
      id: `custom-${Date.now()}`,
      title: newProblem.title!,
      difficulty: newProblem.difficulty as "Easy" | "Medium" | "Hard",
      category: newProblem.category || "Custom",
      desc: newProblem.desc!,
      source: "custom",
    };

    setCustomProblems(prev => [...prev, problem]);
    setNewProblem({ title: "", difficulty: "Easy", category: "Arrays & Hashing", desc: "" });
    setShowAddModal(false);
  };

  const removeCustomProblem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCustomProblems(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Header Component */}
        <StatsHeader isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Filter Bar Component */}
        <FilterBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          availableCategories={availableCategories}
          totalProblems={filteredProblems.length}
        />

        {/* Problem List */}
        <div className="mt-6 space-y-3">
          {filteredProblems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-1">No problems found</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs mx-auto">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            filteredProblems.map((problem: Problem) => (
              <ProblemCard
                key={`${problem.source}-${problem.id}`}
                problem={problem}
                activeTab={activeTab}
                onRemove={removeCustomProblem}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <p className="text-xs text-neutral-400 dark:text-neutral-600">
            Built with Next.js • Data sourced from Blind 75 & NeetCode 150
          </p>
        </footer>

        {/* Modal Component */}
        <AddProblemModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          newProblem={newProblem}
          setNewProblem={setNewProblem}
          onAdd={addCustomProblem}
        />
      </div>
    </div>
  );
}

//
