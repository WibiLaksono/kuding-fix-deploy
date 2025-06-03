'use client'; // Ini tetap diperlukan karena ini adalah halaman client-side

import { Suspense } from "react";
import CheckoutDetails from "./CheckoutDetails";

export default function CheckoutPage() {
  return (
    <div className="bg-gray-100 container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>

      {/* Sekarang, Suspense membungkus komponen yang memanggil useSearchParams() */}
      <Suspense fallback={<div className="text-center">Memuat detail produk...</div>}>
        <CheckoutDetails />
      </Suspense>
    </div>
  );
}