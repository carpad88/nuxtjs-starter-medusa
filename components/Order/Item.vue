<template>
  <div class="flex mb-6 last:mb-0">
    <div class="bg-ui rounded-md overflow-hidden mr-4 max-w-1/4">
      <img
        class="h-auto w-full object-cover"
        :src="item.thumbnail"
        :alt="item.title"
      >
    </div>
    <div class="flex text-sm flex-grow py-2">
      <div class="flex flex-col justify-between w-full flex-grow">
        <div class="flex flex-col">
          <p class="font-semibold mb-2">
            {{ item.title }}
          </p>
          <p>
            <span class="text-ui-dark">Variant:</span> {{ item.description }}
          </p>
        </div>
        <div class="flex space-x-4 text-gray-400 font-light">
          <p class="border-r pr-4 border-gray-500">
            Quantity
            <span class="text-gray-700 font-semibold">
              {{ item.quantity }}
            </span>
          </p>
          <p>
            Price
            <span class="text-gray-700 font-semibold">
              {{ formatPrice(item.unit_price, currency, item.quantity) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '~/utils/format-price'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  methods: {
    formatPrice
  }
}
</script>
