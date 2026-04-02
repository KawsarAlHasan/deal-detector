import React from "react";
import { BASE_URL } from "../api-services/api";

interface RecepiesModelProps {
  open: boolean;
  onClose: () => void;
  recipe: any;
}

const RecepiesModel = ({ open, onClose, recipe }: RecepiesModelProps) => {
  if (!open || !recipe) return null;

  const response = recipe?.response_data?.response;
  const dishName = response?.dish ?? "Recipe";
  const ingredients: string[] = response?.items ?? [];
  const steps: string[] = response?.steps ?? [];

  const imageUrl = response?.image_url
    ? BASE_URL + response?.image_url
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${response.image_url}`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-[550px] rounded-xl shadow-xl overflow-hidden">
        {/* Header image */}
        <div className="w-full h-[220px] bg-[#4AB7B6] flex justify-center items-center">
          <img
            src={imageUrl}
            alt={dishName}
            className="w-[200px] h-[200px] rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/static/images/fraise-large 1.png";
            }}
          />
        </div>

        <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
          {/* Dish name */}
          <h1 className="text-2xl font-bold mt-5 mb-4 text-[#0F2A44]">
            {dishName}
          </h1>

          {/* Ingredients */}
          <h2 className="text-xl font-bold mb-3">Ingredients</h2>
          {ingredients.length > 0 ? (
            <ul className="list-disc ml-6 text-gray-700 leading-7 capitalize">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">No ingredients listed.</p>
          )}

          {/* Steps */}
          <h2 className="text-xl font-bold mt-6 mb-3">Steps:</h2>
          {steps.length > 0 ? (
            <ol className="list-decimal ml-6 text-gray-700 leading-7">
              {steps.map((step, index) => (
                <li key={index} className="mb-1">
                  {step}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-400 text-sm">No steps available.</p>
          )}

          {/* Actions */}
          <div className="mt-6">
            <button className="w-full bg-[#0F2A44] text-white py-3 rounded-lg font-semibold">
              + Generate Shopping List
            </button>
            <button
              onClick={onClose}
              className="w-full border mt-3 py-3 rounded-lg text-gray-700 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecepiesModel;
