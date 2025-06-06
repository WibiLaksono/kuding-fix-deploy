'use client'; // Ini WAJIB ada di baris paling atas file ini

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CheckoutDetails() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("name");
  const price = searchParams.get("price");
  const imageUrl = searchParams.get("imageUrl");
  const quantity = searchParams.get("quantity") || 1;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
      {/* Pastikan imageUrl ada sebelum merender Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={productName || "Product Image"} // Tambahkan fallback untuk alt
          width={200}
          height={200}
          className="rounded-md"
        />
      )}
      <div>
        <h2 className="text-2xl font-bold">{productName}</h2>
        <p className="text-lg">
          Price: <span className="text-green-600">{price}</span>
        </p>
        <p className="text-lg">Quantity: {quantity}</p>
        <p className="text-lg font-semibold mt-2">
          Total: <span className="text-red-500">{price * quantity}</span>
        </p>
        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}