<template>
  <div class="container mx-auto p-8">
    <div class="flex relative flex-col-reverse lg:flex-row">
      <div class="flex flex-col lg:mr-12 lg:w-3/5">
        <div class="mb-8">
          <h1 class="font-semibold">
            Shopping Bag
          </h1>
        </div>
        <div class="w-full">
          <shopping-bag-cart-item
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
      <div class="relative w-full mb-8 lg:mb-0 lg:w-2/5">
        <shopping-bag-cart-review />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShoppingBag',
  computed: {
    ...mapGetters({ items: 'cart/items' })
  }
}
</script>
