<template>
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
</template>

<script>
import { formatPrice } from '@/utils/format-price'

export default {
  name: 'Totals',
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
