<template>
  <div class="bg-white rounded-md shadow px-8 py-6 w-full sticky top-28">
    <h3 class="font-semibold mb-4">
      Order Summary
    </h3>

    <totals :item="$store.state.cart.cart" />

    <nuxt-link to="/checkout">
      <div class="btn-ui w-full text-center">
        Checkout
      </div>
    </nuxt-link>
  </div>
</template>
