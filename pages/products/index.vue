<template>
  <div class="container mx-auto p-8">
    <div class="w-full border-b border-ui-medium pb-6 mb-2 lg:mb-6 flex items-center justify-between">
      <h1 class="font-semibold text-3xl">
        All Products
      </h1>
    </div>

    <div
      v-if="products.length"
      class="grid grid-cols-4 gap-8 "
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :item="product"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsIndex',
  data () {
    return {
      products: [{
        id: 1,
        title: 'Medusa Coffee Mug',
        thumbnail: '',
        variants: [{ prices: [{ amount: 0 }] }]
      }]
    }
  },
  async fetch () {
    try {
      const { products } = await this.$axios.$get('/store/products')
      this.products = products
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('The server is not responding')
    }
  }
}
</script>
