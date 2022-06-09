<template>
  <checkout-step title="Delivery method" :show-success-icon="isCompleted">
    <div v-show="isOpen" class="my-6">
      <div class="text-gray-700 text-xs flex items-center mb-4">
        <div class="bg-gray-400 text-white w-4 h-4 rounded-lg text-center mr-2">
          !
        </div>
        <p>Taxes may apply, and will be added upon continuation to the next step.</p>
      </div>

      <div class="space-y-4">
        <div
          v-for="option in shippingOptions"
          :key="option.id"
          class="shadow rounded-md p-4 w-full border-transparent flex justify-between items-center cursor-pointer"
          @click="$store.dispatch('cart/addShippingMethod', option.id)"
        >
          <div>
            <div class="font-semibold text-sm">
              {{ option.name }}
            </div>
            <div class="text-xs text-gray-500 mt-2">
              {{ formatPrice(option.amount, cartCurrencyCode) }}
            </div>
          </div>
          <checkout-check-icon
            v-if="shippingMethod === option.id"
          />
        </div>
      </div>

      <div class="w-full flex items-center justify-between mt-4">
        <button
          class="text-gray-500 flex items-center text-sm transform transition"
          hover="text-black -translate-x-2"
          @click="$emit('updateSteps', step, false)"
        >
          <span class="w-2.5 h-2.5 mr-1">
            <svg
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <g>
                <path
                  d="M45,62.8c-0.5,0-0.9-0.2-1.3-0.6L18.6,35.4c-1.7-1.9-1.7-4.9,0-6.7L43.7,1.8c0.7-0.7,1.8-0.7,2.5-0.1 c0.7,0.7,0.7,1.8,0.1,2.5L21.1,31c-0.5,0.5-0.5,1.4,0,2l25.2,26.8c0.7,0.7,0.6,1.8-0.1,2.5C45.9,62.6,45.4,62.8,45,62.8z"
                />
              </g>
            </svg>
          </span>

          <span>Go back</span>
        </button>

        <FormulateInput
          type="button"
          label="Next"
          input-class="btn-ui"
          @click="$emit('updateSteps', step, true)"
        />
      </div>
    </div>
  </checkout-step>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatPrice } from '@/utils/format-price'

export default {
  name: 'Delivery',
  props: {
    isCompleted: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters({
      shippingOptions: 'cart/shippingOptions',
      cartCurrencyCode: 'cart/cartCurrencyCode',
      shippingMethod: 'cart/shippingMethod'
    })
  },
  methods: {
    formatPrice
  }
}
</script>
