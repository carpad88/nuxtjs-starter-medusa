<template>
  <div class="bg-white rounded-md shadow px-8 py-6 w-full sticky top-28">
    <h3 class="font-semibold mb-4">
      Order Summary
    </h3>

    <div class="my-4 border-t bt-gray-100">
      <div class="font-light text-sm space-y-3 mt-3">
        <div class="flex items-center justify-between mb-2">
          <p>Subtotal</p>
          <p class="font-medium">
            {{ formatPrice(cart.subtotal, currencyCode ) }}
          </p>
        </div>

        <div v-if="shippingTotal" class="flex items-center justify-between mb-2">
          <p>Shipping</p>
          <p class="font-medium">
            {{ formatPrice(shippingTotal, currencyCode) }}
          </p>
        </div>

        <div class="flex items-center justify-between mb-2">
          <p>Taxes</p>
          <p class="font-medium">
            {{ formatPrice(cart.tax_total, currencyCode) }}
          </p>
        </div>

        <div class="h-px w-full bg-ui-medium mb-2" />

        <div class="flex items-center justify-between">
          <p>Total</p>
          <p class="font-medium">
            {{ formatPrice(cart.total, currencyCode) }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <button class="btn-ui w-full">
        Checkout
      </button>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '@/utils/format-price'

export default {
  computed: {
    cart () {
      return this.$store.state.cart.cart
    },
    currencyCode () {
      return this.cart.region.currency_code
    },
    shippingTotal () {
      return this.cart.shipping_total || 0
    }
  },
  methods: {
    formatPrice
  }
}
</script>
