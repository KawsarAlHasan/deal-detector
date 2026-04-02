"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import RecepiesModel from "../RecepiesModel";
import { useRecipesList } from "@/app/api-services/aiServices";
import { BASE_URL } from "@/app/api-services/api";

// ── helpers ──────────────────────────────────────────────────────────────────

const getItemsPerPage = () => {
  if (typeof window === "undefined") return 6;
  return window.innerWidth >= 1024 ? 6 : 2;
};

// ── Skeleton card ─────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/60 animate-pulse border border-gray-100 shadow-sm">
    <div className="w-[90px] h-[90px] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200" />
    <div className="h-3 w-16 bg-gray-200 rounded-full" />
    <div className="h-3 w-10 bg-gray-100 rounded-full" />
  </div>
);

// ── Recipe card ───────────────────────────────────────────────────────────────

interface RecipeCardProps {
  recipe: any;
  onClick: () => void;
  index: number;
}

const CARD_BG = [
  "#FFF3E8",
  "#E8F5FF",
  "#F0FFF4",
  "#FFF8E8",
  "#F5E8FF",
  "#E8FFF5",
];

const RecipeCard = ({ recipe, onClick, index }: RecipeCardProps) => {
  const response = recipe?.response_data?.response;
  const dishName = response?.dish ?? "Recipe";
  const imageUrl = response?.image_url
    ? BASE_URL + response.image_url
    : "/static/images/fraise-large 1.png";

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 60}ms` }}
      className="
        group relative flex flex-col items-center gap-2 p-4 rounded-2xl
        bg-white border border-gray-100 shadow-sm
        hover:shadow-lg hover:-translate-y-1 hover:border-[#4AB7B6]/40
        active:scale-95
        transition-all duration-300 ease-out
        animate-fadeSlideUp opacity-0 [animation-fill-mode:forwards]
        text-left w-full cursor-pointer focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[#4AB7B6]
      "
    >
      {/* image container */}
      <div
        className="relative w-[90px] h-[90px] rounded-2xl overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ background: CARD_BG[index % CARD_BG.length] }}
      >
        <img
          src={imageUrl}
          alt={dishName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/static/images/fraise-large 1.png";
          }}
        />
        {/* shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>

      {/* dish name */}
      <p className="text-[11px] font-semibold text-gray-700 text-center line-clamp-2 leading-tight w-full">
        {dishName.length > 45 ? `${dishName.slice(0, 45)}...` : dishName}
      </p>
    </button>
  );
};

// ── Nav button ────────────────────────────────────────────────────────────────

const NavBtn = ({
  onClick,
  disabled,
  children,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={`
      p-2 rounded-full transition-all duration-200
      ${
        disabled
          ? "bg-gray-100 cursor-not-allowed"
          : "bg-[#18365D] hover:bg-[#0F2A44] hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
      }
    `}
  >
    <span className={disabled ? "text-gray-300" : "text-white"}>
      {children}
    </span>
  </button>
);

// ── Main component ────────────────────────────────────────────────────────────

function Recipes() {
  const { recipesList, isLoading, isError } = useRecipesList();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

  // sync items-per-page with viewport
  useEffect(() => {
    const handleResize = () => {
      const next = getItemsPerPage();
      setItemsPerPage((prev) => {
        if (prev !== next) setCurrentPage(0);
        return next;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRecipeClick = useCallback((recipe: any) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  }, []);

  // ── loading ──
  if (isLoading) {
    return (
      <div className="mt-14">
        <p className="font-bold text-lg text-gray-800 mb-5">Recipes</p>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── error ──
  if (isError) {
    return (
      <div className="mt-14 flex flex-col items-center justify-center gap-2 py-10 text-center">
        <span className="text-3xl">⚠️</span>
        <p className="text-red-500 font-medium">Failed to load recipes.</p>
        <p className="text-gray-400 text-sm">Please refresh the page.</p>
      </div>
    );
  }

  const recipes: any[] = recipesList ?? [];
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const paginatedRecipes = recipes.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage >= totalPages - 1;

  return (
    <>
      {/* Keyframe injected once */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp { animation: fadeSlideUp 0.4s ease-out; }
      `}</style>

      <div className="mt-14">
        <div className="w-full flex flex-col gap-5">
          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg text-gray-800 leading-tight">
                Recipes
              </p>
              {recipes.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}{" "}
                  generated
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                {/* Page dots — desktop */}
                <div className="hidden lg:flex items-center gap-1.5 mr-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      aria-label={`Go to page ${i + 1}`}
                      className={`rounded-full transition-all duration-200 ${
                        i === currentPage
                          ? "w-5 h-2 bg-[#18365D]"
                          : "w-2 h-2 bg-gray-200 hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <NavBtn
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                  disabled={isPrevDisabled}
                  label="Previous page"
                >
                  <FaAngleLeft className="text-lg" />
                </NavBtn>

                {/* x/y counter — mobile only */}
                <span className="text-xs font-semibold text-gray-500 lg:hidden w-8 text-center">
                  {currentPage + 1}/{totalPages}
                </span>

                <NavBtn
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
                  }
                  disabled={isNextDisabled}
                  label="Next page"
                >
                  <FaAngleRight className="text-lg" />
                </NavBtn>
              </div>
            )}
          </div>

          {/* ── Empty state ── */}
          {recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
              <span className="text-4xl">🍽️</span>
              <p className="text-gray-500 font-medium">No recipes yet</p>
              <p className="text-gray-400 text-sm">
                Generate your first recipe to see it here.
              </p>
            </div>
          ) : (
            /* ── Grid ── */
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
              {paginatedRecipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {selectedRecipe && (
        <RecepiesModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedRecipe(null);
          }}
          recipe={selectedRecipe}
        />
      )}
    </>
  );
}

export default Recipes;
