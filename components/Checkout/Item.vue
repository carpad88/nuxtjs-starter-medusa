<template>
  <div class="flex">
    <div class="bg-ui rounded-md overflow-hidden mr-4 max-w-1/4">
      <img
        class="h-auto w-full object-cover"
        :src="item.thumbnail"
        :alt="item.title"
      >
    </div>
    <div class="flex justify-between w-full text-sm py-2">
      <div class="flex flex-col justify-between">
        <div>
          <p class="font-semibold mb-2">
            {{ item.title }}
          </p>
          <p>Variant: {{ item.description }}</p>
        </div>
        <div>
          <p class="mb-2">
            Quantity: {{ item.quantity }}
          </p>
          <p class="font-medium">
            Total: {{ formatPrice(item.unit_price, cartCurrencyCode, item.quantity) }}
          </p>
        </div>
      </div>
      <div>
        <p class="font-medium">
          {{ formatPrice(item.unit_price, cartCurrencyCode, 1) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatPrice } from '@/utils/format-price'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({ cartCurrencyCode: 'cart/cartCurrencyCode' })
  },
  methods: {
    formatPrice
  }
}
</script>
