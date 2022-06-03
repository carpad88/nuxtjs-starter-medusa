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
        <p v-if="lowestPrice.currency_code" class="text-lg mt-2 mb-4">
          {{ formatPrice(lowestPrice.amount, lowestPrice.currency_code) }}
        </p>
        <p v-else>
          10 USD
        </p>
        <p class="font-light">
          {{ product.description }}
        </p>

        <products-options
          :options="product.options"
          @updateSelectedOptions="updateSelectedOptions"
        />

        <div class="inline-flex mt-12">
          <button class="btn-ui mr-2 px-12" @click="addItem({variant_id, quantity})">
            Add to bag
          </button>
          <quantity-selector
            :quantity="quantity"
            @increment="increment"
            @decrement="decrement"
          />
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
import { mapActions } from 'vuex'
import { formatPrice } from '@/utils/format-price'

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
      },
      quantity: 1,
      variant_id: null,
      lowestPrice: {}
    }
  },
  async fetch () {
    try {
      const { product } = await this.$axios.$get(`/products/${this.$route.params.id}`)
      this.product = product
      this.imageToShow = this.product.images[0].id
      this.filterLowestPrice()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('The server is not responding')
    }
  },
  computed: {
    currencyCode () {
      return this.$store.state.region.currency_code || 'usd'
    }
  },
  watch: {
    currencyCode () {
      this.filterLowestPrice()
    }
  },
  methods: {
    ...mapActions({
      addItem: 'cart/addItem'
    }),
    formatPrice,
    updateSelectedOptions (value) {
      const variant = this.product.variants.reduce((acc, cur) => {
        return [...acc, {
          variantId: cur.id,
          options: cur.options.map(o => o.value)
        }]
      }, []).filter((variant) => {
        return Object.values(value).sort().join('__') === variant.options.sort().join('__')
      })

      this.variant_id = variant[0].variantId
    },
    increment () {
      this.quantity += 1
    },
    decrement () {
      if (this.quantity > 1) { this.quantity -= 1 }
    },
    filterLowestPrice () {
      this.lowestPrice = this.product.variants
        .reduce((prices, cur) => {
          return [...prices, ...cur.prices.filter(price => price.currency_code === this.currencyCode)]
        }, [])
        .sort((a, b) => a.amount - b.amount)[0]
    }
  }
}
</script>
