<template>
  <div class="container mx-auto p-8">
    <div class="w-full border-b border-ui-medium pb-6 mb-2 lg:mb-6 flex items-center justify-between">
      <h1 class="font-semibold text-3xl">
        All Products
      </h1>
    </div>

    <div class="grid grid-cols-4 gap-8 ">
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
  async asyncData ({ $axios }) {
    const { products } = await $axios.$get('/store/products')
    return { products }
  }
}
</script>
