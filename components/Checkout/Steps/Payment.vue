<template>
  <checkout-step title="Payment" :show-success-icon="isCompleted">
    <div v-show="isOpen">
      <div class="flex my-8 uppercase" :class="providers.length > 1 ? 'space-x-4' : ''">
        <div
          v-for="{provider_id, id} in providers"
          :key="id"
          class="w-full px-4 py-2 border border-gray-300 rounded flex p-1 items-center justify-between cursor-pointer"
          :class="provider === provider_id ? 'border-green-500' : ''"
          @click="provider = provider_id"
        >
          <div>{{ provider_id }}</div>
          <checkout-check-icon v-if="provider === provider_id" class="ml-2" />
        </div>
      </div>

      <div v-show="provider === 'stripe'">
        <div
          id="stripe_container"
          class="bg-white rounded-md p-6 shadow mt-4"
          :class="errors ? 'border border-red-600' : ''"
        />
        <div v-if="errors" class="text-red-600 text-sm mt-2">
          {{ errors }}
        </div>
      </div>

      <div class="flex items-center justify-between mt-4">
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
          label="Pay"
          input-class="btn-ui"
          @click="processPayment"
        />
      </div>
    </div>
  </checkout-step>
</template>

<script>
export default {
  name: 'Payment',
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
  data () {
    return {
      provider: null,
      card: null,
      errors: null
    }
  },
  computed: {
    providers () {
      return this.$store.getters['cart/paymentProviders']
    }
  },
  watch: {
    isOpen (val) {
      if (val) {
        this.$store.dispatch('cart/createPaymentSession')
      }
    },
    provider (val) {
      if (val === 'stripe') {
        this.showStripeCard()
      }
    }
  },
  methods: {
    showStripeCard () {
      const elements = this.$stripe.elements()
      const card = elements.create('card')
      card.mount('#stripe_container')
      this.card = card
    },
    async processPayment () {
      if (this.provider === 'stripe') {
        await this.$store.dispatch('cart/setPaymentSession', this.provider)

        const { error } = await this.$stripe.confirmCardPayment(this.$store.getters['cart/clientSecret'], {
          payment_method: {
            card: this.card,
            billing_details: {
              email: this.email
            }
          }
        })

        if (error) { this.errors = error.message }

        if (!error) {
          const { id } = await this.$store.dispatch('cart/completeCart')
          this.$router.push(`order-summary/${id}`)
        }
      }
    }
  }
}
</script>
