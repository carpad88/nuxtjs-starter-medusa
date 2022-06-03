<template>
  <li class="flex">
    <div class="overflow-hidden rounded-md mr-4 bg-gray-100">
      <img class="w-16 h-auto" :src="item.thumbnail" :alt="item.title">
    </div>
    <div class="flex flex-col justify-between py-2 space-y-2">
      <div>
        <p class="font-medium text-sm">
          {{ item.title }}
        </p>
        <p class="text-xs mt-2">
          <span class="text-gray-500">Variant:</span> {{ item.description }}
        </p>
      </div>
      <div class="flex items-center font-light text-xs">
        <p>
          <span class="text-gray-500">Quantity</span>
          <span>{{ item.quantity }}</span>
        </p>
        <div class="w-px h-4 bg-ui-dark mx-3" />
        <p>
          <span class="text-gray-500">Price</span>
          <span>
            {{ formatPrice(item.unit_price, cartCurrencyCode, item.quantity) }}
          </span>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import { formatPrice } from '@/utils/format-price'

export default {
  name: 'CartPopoverItem',
  props: {
    item: {
      type: Object,
      default () {
        return {
          title: 'Item added',
          description: 'Description item',
          quantity: 1,
          unit_price: 9.5,
          thumbnail: ''
        }
      }
    }
  },
  computed: {
    cartCurrencyCode () {
      return this.$store.state.cart.cart.region.currency_code
    }
  },
  methods: {
    formatPrice
  }

}
</script>
