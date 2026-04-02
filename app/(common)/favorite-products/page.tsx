"use client";
import ProductCard from "@/app/_components/ProductCard";
import { useWishList } from "@/app/api-services/productsServices";

function page() {
  const { wishList, isLoading, isError, mutate } = useWishList();

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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-6">
      {wishList.length === 0 ? (
        <p className="text-center text-3xl font-bold text-[#18365D]">
          No favorite products found
        </p>
      ) : (
        wishList?.map((product: any, index: number) => {
          const product_data = product?.product;
          return (
            <ProductCard
              key={product.id}
              id={product_data?.id}
              title={product_data?.name}
              price={product_data?.price}
              image={product_data?.image_url}
              brand={product_data?.brand}
              unitAmount={product_data?.unit_amount}
              favorite={true} // true if product is in wishlist
              favoriteId={product.id} // pass the wishlist item id
              isOnOffer={product_data?.is_on_offer === 1}
              originalPrice={product_data?.original_price}
              discountLabel={product_data?.discount_label}
              productUrl={product_data?.product_url}
              mutate={mutate}
              wishListMutate={mutate}
            />
          );
        })
      )}
    </div>
  );
}

export default page;
