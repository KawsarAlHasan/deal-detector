"use client";
import { message } from "antd";
import Link from "next/link";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {
  fetcherWithTokenDelete,
  fetcherWithTokenPost,
} from "../api-services/api";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  brand?: string;
  unitAmount?: string;
  originalPrice?: number | null;
  discountLabel?: string | null;
  isOnOffer?: boolean;
  favorite?: boolean;
  favoriteId?: number;
  productUrl?: string;
  mutate?: () => void;
  wishListMutate?: () => void;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  brand,
  unitAmount,
  originalPrice,
  discountLabel,
  isOnOffer = false,
  favorite = false,
  favoriteId,
  productUrl,
  mutate,
  wishListMutate,
}: ProductCardProps) => {
  const handleAddToHeart = async (id: any) => {
    try {
      const res = await fetcherWithTokenPost(
        "/api/service/favorite-products/",
        {
          product_id: id,
        },
      );
      if (res) {
        message.success("Product added to favorites!");
        mutate?.();
        wishListMutate?.();
      }
    } catch (error: any) {
      console.log("error:", error);
      message.error("You cannot add more favorites. Maximum limit of 3 reached.");
    }
  };

  const handleRemoveFromHeart = async (favoriteId: any) => {
    try {
      await fetcherWithTokenDelete(
        `/api/service/favorite-products/${favoriteId}/`,
      );

      message.success("Product removed from favorites!");
      mutate?.();
      wishListMutate?.();
    } catch (error: any) {
      console.log("error:", error);
      message.error("Failed to remove from favorites!");
    }
  };

  return (
    <div className="w-full bg-[#E9F2FA] rounded-xl shadow-md p-3 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <span className="bg-[#F6C945] text-black text-xs px-3 py-1 rounded-sm font-medium">
            {brand}
          </span>
          {isOnOffer && discountLabel && (
            <span className="bg-red-500 text-slate-500 text-xs px-2 py-1 rounded-sm font-medium">
              {discountLabel}
            </span>
          )}
        </div>
        {favorite ? (
          <FaHeart
            onClick={() => handleRemoveFromHeart(favoriteId)}
            className="text-red-500 text-lg cursor-pointer"
          />
        ) : (
          <FaRegHeart
            onClick={() => handleAddToHeart(id)}
            className="text-gray-500 text-lg cursor-pointer"
          />
        )}
      </div>

      <img
        // src={image}
        src={"/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg"}
        alt={title}
        className="w-full rounded-2xl object-contain h-36"
      />

      <div className="flex flex-col gap-0.5">
        <p className="font-semibold text-sm leading-tight line-clamp-2">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm font-bold text-[#18365D]">
            ${price.toFixed(2)}
          </p>
          {originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </p>
          )}
          {unitAmount && (
            <p className="text-xs text-gray-500 ml-auto">{unitAmount}</p>
          )}
        </div>
      </div>

      <Link
        href={`/products/${id}`}
        className={`text-center w-full py-2 rounded-md font-medium text-sm transition-colors border border-gray-300 text-gray-700 hover:bg-gray-100`}
      >
        View Product
      </Link>
    </div>
  );
};

export default ProductCard;
