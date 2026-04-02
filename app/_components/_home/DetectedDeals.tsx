"use client";
import Link from "next/link";
import ProductCard from "../ProductCard";
import { useProducts, useWishList } from "@/app/api-services/productsServices";

function DetectedDeals() {
  const { productsList, isLoading, isError, mutate } = useProducts(1, 16);
  const { wishList, mutate: wishListMutate } = useWishList();

  const wishListMap = new Map();
  wishList?.forEach((item: any) => {
    wishListMap.set(item.product_id, {
      wishlistId: item.id,
      productId: item.product_id,
    });
  });

  if (isLoading) {
    return (
      <main className="w-full flex flex-col gap-10 mt-14">
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="font-bold text-lg">Detected Deals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-[#E9F2FA] rounded-xl shadow-md p-3 h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="w-full flex flex-col gap-10 mt-14">
        <p className="text-red-500">
          Failed to load products. Please try again.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col gap-10 mt-14">
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between">
          <p className="font-bold text-lg">Detected Deals</p>
          <Link
            href="/products"
            className="font-semibold text-[#18365D] cursor-pointer"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {productsList?.results?.map((product: any, index: number) => {
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
                favorite={!!wishlistItem} // true if product is in wishlist
                favoriteId={wishlistItem?.wishlistId} // pass the wishlist item id
                isOnOffer={product.is_on_offer === 1}
                originalPrice={product.original_price}
                discountLabel={product.discount_label}
                productUrl={product.product_url}
                mutate={mutate}
                wishListMutate={wishListMutate}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default DetectedDeals;
