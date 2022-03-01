<template>
  <div class="container mx-auto p-8">
    <div class="flex flex-col lg:flex-row">
      <div class="lg:w-3/5 lg:pr-14">
        <div class="flex">
          <div class="hidden lg:flex flex-col items-center mr-4">
            <div class="w-auto h-full object-center object-cover px-4 space-y-4">
              <img
                v-for="image in product.images"
                :key="image.id"
                width="150"
                alt=""
                :src="image.url"
                class="cursor-pointer"
                @click="imageToShow = image.id"
              >
            </div>
          </div>

          <div class="h-auto w-full flex-1 flex flex-col rounded-lg overflow-hidden">
            <div class="w-auto h-full">
              <div
                v-for="image in product.images"
                :key="image.id"
              >
                <div v-if="image.id === imageToShow">
                  <img
                    alt=""
                    :src="image.url"
                    class=" w-full"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 lg:mt-0 lg:w-2/5 lg:max-w-xl">
        <h1 class="font-semibold text-3xl">
          {{ product.title }}
        </h1>
        <p v-if="product.variants" class="text-lg mt-2 mb-4">
          {{ product.variants[0].prices[0].amount/100 }} {{ product.variants[0].prices[0].currency_code }}
        </p>
        <p v-else>
          10 USD
        </p>
        <p class="font-light">
          {{ product.description }}
        </p>
        <div v-for="option in product.options" :key="option.id" class="mt-6">
          <div class="text-sm">
            <p class="font-medium mb-2">
              {{ option.title }}
            </p>
            <div>
              <button
                v-for="value in option.values"
                :key="value.id"
                class="bg-ui-dark text-white inline-flex items-center justify-center rounded-sm text-xs h-12 w-12 mr-2 last:mr-0 hover:bg-ui-dark hover:text-white"
              >
                {{ value.value }}
              </button>
            </div>
          </div>
        </div>
        <div class="inline-flex mt-12">
          <button class="btn-ui mr-2 px-12">
            Add to bag
          </button>
          <div class="flex items-center rounded-md px-4 py-2 shadow">
            <button>–</button>
            <span class="w-8 text-center">1</span>
            <button>+</button>
          </div>
        </div>
        <div class="mt-12">
          <div class="border-t last:border-b border-ui-medium py-6">
            <h3 class="-my-3 flow-root">
              <button
                class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                type="button"
                @click="showDetails = !showDetails"
              >
                <span class="font-medium text-gray-900">Details</span>
                <span class="ml-6 flex items-center">
                  <span>—</span>
                </span>
              </button>
            </h3>
            <div v-if="showDetails" class="pt-6">
              <div class="space-y-4 text-ui-dark text-sm">
                <ul class="list-inside list-disc space-y-2">
                  <li>Weight: {{ product.weight ? `${product.weight} g` : 'Unknown' }}</li>
                  <li>Width: {{ product.width ? `${product.width} cm` : 'Unknown' }}</li>
                  <li>Height: {{ product.height ? `${product.height} cm` : 'Unknown' }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      showDetails: false,
      imageToShow: 'default_image',
      product: {
        id: 1,
        title: 'Medusa Coffee Mug',
        description: 'Every programmer\'s best friend.',
        thumbnail: '',
        variants: [{ prices: [{ amount: 0, currency_code: 'usd' }] }],
        images: [
          { id: 'default_image', url: 'https://picsum.photos/600/400' },
          { id: 'another_image', url: 'https://picsum.photos/600/400?id=50' }
        ]
      }
    }
  },
  async fetch () {
    try {
      const { product } = await this.$axios.$get(`/store/products/${this.$route.params.id}`)
      this.product = product
      this.imageToShow = this.product.images[0].id
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('The server is not responding')
    }
  },
  computed: {
    lowestPrice () {
      const lowestPrice = this.product.variants.reduce((acc, curr) => {
        return curr.prices.reduce((lowest, current) => {
          if (lowest.amount > current.amount) {
            return current
          }
          return lowest
        })
      }, { amount: 0 })

      return lowestPrice || { amount: 10, currency_code: 'usd' }
    }
  }
}
</script>
