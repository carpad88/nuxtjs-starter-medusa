<template>
  <div class="flex w-full flex-col lg:relative bg-white mb-4 lg:mb-0 rounded-lg shadow py-6 px-8 max-h-review overflow-hidden">
    <div class="flex-grow overflow-y-scroll">
      <checkout-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        class="mb-4 last:mb-0"
      />
    </div>

    <totals :item="$store.state.cart.cart" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CheckoutSummary',
  computed: {
    ...mapGetters({ items: 'cart/items' })
  }
}
</script>
