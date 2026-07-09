"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import blind75Data from "@/data/75-blind.json";
import neetcode150Data from "@/data/neetcode-150.json";

// Import our components
import StatsHeader from "../components/StatsHeader";
import FilterBar from "../components/FilterBar";
import ProblemCard from "../components/ProblemCard";
import AddProblemModal from "../components/AddProblemModal";

// ✅ Import Plus icon for the button
import { Plus } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  desc: string;
  source?: "blind75" | "neetcode150" | "custom" | "both";
}

type TabType = "all" | "blind75" | "neetcode150" | "custom";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  // Load custom problems with error handling
  useEffect(() => {
    try {
      const saved = localStorage.getItem("customProblems");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCustomProblems(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Error loading custom problems:", error);
      setCustomProblems([]);
    }

    // Check system dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Save custom problems with error handling
  useEffect(() => {
    try {
      localStorage.setItem("customProblems", JSON.stringify(customProblems));
    } catch (error) {
      console.error("Error saving custom problems:", error);
    }
  }, [customProblems]);

  // Sync URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab !== "all") params.set("tab", activeTab);
    if (searchQuery) params.set("q", searchQuery);
    if (difficultyFilter !== "all") params.set("diff", difficultyFilter);
    if (categoryFilter !== "all") params.set("cat", categoryFilter);

    const queryString = params.toString();
    const url = queryString ? `/?${queryString}` : "/";
    router.replace(url, { scroll: false });
  }, [activeTab, searchQuery, difficultyFilter, categoryFilter, router]);

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

    const uniqueMap = new Map<string, { problem: Problem; sources: string[] }>();

    b75.forEach((p: Problem) => {
      const num = getProblemNumber(p.title);
      if (!uniqueMap.has(num)) {
        uniqueMap.set(num, { problem: p, sources: ["blind75"] });
      } else {
        uniqueMap.get(num)!.sources.push("blind75");
      }
    });

    n150.forEach((p: Problem) => {
      const num = getProblemNumber(p.title);
      if (!uniqueMap.has(num)) {
        uniqueMap.set(num, { problem: p, sources: ["neetcode150"] });
      } else {
        uniqueMap.get(num)!.sources.push("neetcode150");
      }
    });

    const combinedUnique = Array.from(uniqueMap.values()).map(({ problem, sources }) => {
      if (sources.length > 1) {
        return { ...problem, source: "both" as const };
      }
      return problem;
    });

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

  const removeCustomProblem = (id: string) => {
    setCustomProblems(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Stats Header - Full Width */}
        <StatsHeader isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Filter Bar - Sticky with proper spacing (NO Add Problem button here) */}
        <div className="sticky top-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 bg-neutral-50/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md py-4 border-b border-neutral-200/50 dark:border-neutral-800/50">
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
            // ❌ REMOVED onAddProblem from here
          />
        </div>

        {/* Stats Row with Add Problem Button */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {activeTab === "custom" && (
              <span className="text-indigo-500 dark:text-indigo-400">
                • {filteredProblems.length} in your custom list
              </span>
            )}
          </div>

          {/* ✅ Add Problem Button - Now below the stats */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Problem
          </button>
        </div>

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
                key={`${problem.source || 'unknown'}-${problem.id}`}
                problem={problem}
                activeTab={activeTab}
                onRemove={problem.source === "custom" ? removeCustomProblem : undefined}
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

        {/* Add Problem Modal */}
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading problems...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
