<template>
  <div class="my-4 border-t bt-gray-100">
    <div class="font-light text-sm space-y-3 mt-3">
      <div class="flex items-center justify-between mb-2">
        <p>Subtotal</p>
        <p class="font-medium">
          {{ formatPrice(item.subtotal, currencyCode ) }}
        </p>
      </div>

      <div v-if="item.shipping_total" class="flex items-center justify-between mb-2">
        <p>Shipping</p>
        <p class="font-medium">
          {{ formatPrice(item.shipping_total, currencyCode) }}
        </p>
      </div>

      <div class="flex items-center justify-between mb-2">
        <p>Taxes</p>
        <p class="font-medium">
          {{ formatPrice(item.tax_total, currencyCode) }}
        </p>
      </div>

      <div class="h-px w-full bg-ui-medium mb-2" />

      <div class="flex items-center justify-between">
        <p>Total</p>
        <p class="font-medium">
          {{ formatPrice(item.total, currencyCode) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '@/utils/format-price'

export default {
  name: 'Totals',
  props: {
    item: {
      type: Object,
      default () { return {} }
    }
  },
  computed: {
    currencyCode () {
      return this.item.currency_code || this.$store.getters['cart/cartCurrencyCode']
    }
  },
  methods: {
    formatPrice
  }
}
</script>
