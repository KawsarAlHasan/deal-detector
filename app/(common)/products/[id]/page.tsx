"use client";
import ProductCard from "@/app/_components/ProductCard";
import {
  useProduct,
  useProducts,
  useWishList,
} from "@/app/api-services/productsServices";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { message, Spin } from "antd";
import {
  fetcherWithTokenDelete,
  fetcherWithTokenPost,
} from "@/app/api-services/api";

function page() {
  const params = useParams();
  const id = Number(params.id);

  const { product, isLoading, isError } = useProduct(id);

  const {
    productsList,
    isLoading: productLoading,
    isError: productError,
    mutate: productMutate,
  } = useProducts(1, 8, product?.category_id);
  const { wishList, mutate: wishListMutate } = useWishList();

  const wishListMap = new Map();
  wishList?.forEach((item: any) => {
    wishListMap.set(item.product_id, {
      wishlistId: item.id,
      productId: item.product_id,
    });
  });

  const currentWishlistItem = wishListMap.get(id);
  const isFavorite = !!currentWishlistItem;
  const [loadingFav, setLoadingFav] = useState(false);

  const handleAddToHeart = async (productId: any) => {
    setLoadingFav(true);
    try {
      const res = await fetcherWithTokenPost(
        "/api/service/favorite-products/",
        {
          product_id: productId,
        },
      );
      if (res) {
        message.success("Product added to favorites!");
        wishListMutate?.();
      }
    } catch (error: any) {
      message.error(
        "You cannot add more favorites. Maximum limit of 3 reached.",
      );
    } finally {
      setLoadingFav(false);
    }
  };

  const handleRemoveFromHeart = async (favoriteId: any) => {
    setLoadingFav(true);
    try {
      await fetcherWithTokenDelete(
        `/api/service/favorite-products/${favoriteId}/`,
      );
      message.success("Product removed from favorites!");
      wishListMutate?.();
    } catch (error: any) {
      message.error("Failed to remove from favorites!");
    } finally {
      setLoadingFav(false);
    }
  };

  if (isLoading) return <Spin />;
  if (isError) return <p>Error loading product</p>;

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto mt-6">
      <div className="text-sm text-[#18365D] flex items-center gap-1 mb-4">
        <Link href="/" className="hover:underline">
          Back
        </Link>
        <span>/</span>
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:underline">
          All Products
        </Link>
        <span>/</span>
        <Link href={`/products/${id}`} className="underline font-semibold">
          Product details
        </Link>
      </div>

      <div className="bg-white px-4 md:px-12 lg:px-20 mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              // src={
              //   "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg"
              // }
              src={product?.image_url}
              alt={product?.name}
              className="w-full max-h-[520px] object-contain rounded-xl border shadow-sm"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm mb-1">{product?.brand}</p>
            <h1 className="text-[20px] font-semibold mb-2">{product?.name}</h1>
            <p className="text-red-500 text-2xl font-semibold mb-2">
              ${product?.price?.toFixed(2)}
            </p>
            <label className="text-gray-700 font-medium mb-1 block">
              Quantity
            </label>
            <p className="border rounded-lg px-4 py-2 w-40 mb-4">
              {product?.unit_amount}
            </p>

            <button
              onClick={() =>
                isFavorite
                  ? handleRemoveFromHeart(currentWishlistItem.wishlistId)
                  : handleAddToHeart(id)
              }
              disabled={loadingFav}
              className={`rounded-lg py-3 w-48 mb-6 transition flex items-center justify-center gap-2 border-2 bg-transparent disabled:opacity-60 disabled:cursor-not-allowed ${
                isFavorite
                  ? "border-red-500 text-red-500 hover:bg-red-50"
                  : "border-gray-800 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {loadingFav ? "..." : isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
            </button>

            {product?.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Store Price Comparison */}
            {product?.matching_products?.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mb-3">Available at</h2>
                <div className="flex flex-col gap-3 w-full max-w-md">
                  {product.matching_products.map((store: any) => (
                    <div
                      key={store.id}
                      className="flex items-center justify-between border rounded-lg py-3 px-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                          {store.supermarket_name?.charAt(0)}
                        </div>
                        <span className="font-medium">
                          {store.supermarket_name}
                        </span>
                      </div>
                      <span className="font-semibold">
                        ${store.price?.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <p className="font-bold text-lg">Similar Product</p>
        <Link
          href="/products"
          className="border rounded border-[#FEAD2B] px-2 text-[#18365D] cursor-pointer flex items-center gap-3"
        >
          View all
        </Link>
      </div>

      {productLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-[#E9F2FA] rounded-xl shadow-md p-3 h-64 animate-pulse"
            />
          ))}
        </div>
      )}

      {productError && (
        <p className="text-red-500 mt-4">
          Failed to load similar products. Please try again.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {productsList?.results?.map((product: any) => {
          const wishlistItem = wishListMap.get(product.id);

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              image={product.image_url}
              brand={product.brand}
              unitAmount={product.unit_amount}
              favorite={!!wishlistItem}
              favoriteId={wishlistItem?.wishlistId}
              isOnOffer={product.is_on_offer === 1}
              originalPrice={product.original_price}
              discountLabel={product.discount_label}
              productUrl={product.product_url}
              mutate={productMutate}
              wishListMutate={wishListMutate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default page;
