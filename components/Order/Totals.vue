<template>
  <div class="my-4 border-t bt-gray-100">
    <div v-if="order" class="font-light text-sm space-y-3 mt-3">
      <div class="flex items-center justify-between mb-2">
        <p>Subtotal</p>
        <p class="font-medium">
          {{ formatPrice(order.subtotal, order.currency_code ) }}
        </p>
      </div>

      <div class="flex items-center justify-between mb-2">
        <p>Shipping</p>
        <p class="font-medium">
          {{ formatPrice(order.shipping_total, order.currency_code) }}
        </p>
      </div>

      <div class="flex items-center justify-between mb-2">
        <p>Taxes</p>
        <p class="font-medium">
          {{ formatPrice(order.tax_total, order.currency_code) }}
        </p>
      </div>

      <div class="h-px w-full bg-ui-medium mb-2" />

      <div class="flex items-center justify-between">
        <p>Total</p>
        <p class="font-medium">
          {{ formatPrice(order.total, order.currency_code) }}
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
    order: { type: Object, default () { return {} } }
  },
  methods: {
    formatPrice
  }
}
</script>
