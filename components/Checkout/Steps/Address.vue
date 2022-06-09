<template>
  <checkout-step title="Address" :show-success-icon="isCompleted">
    <FormulateForm
      v-show="isOpen"
      v-slot="{ hasErrors }"
      name="formAddress"
      class="space-y-4"
      :keep-model-data="true"
      @submit="submitHandler"
    >
      <div class="flex space-x-8">
        <FormulateInput
          name="first_name"
          label="First name*"
          validation="required"
          class="w-1/2"
        />

        <FormulateInput
          name="last_name"
          label="Last name*"
          validation="required"
          class="w-1/2"
        />
      </div>

      <FormulateInput
        name="company"
        label="Company"
        class="w-full"
      />

      <FormulateInput
        name="address_1"
        label="Address*"
        validation="required"
        class="w-full"
      />

      <FormulateInput
        name="address_2"
        label="Apartment, suite, etc"
        class="w-full"
      />

      <div class="flex space-x-8">
        <FormulateInput
          type="select"
          name="country_code"
          label="Country*"
          validation="required"
          class="w-1/2"
          :options="countries"
        />

        <FormulateInput
          name="city"
          label="City*"
          validation="required"
          class="w-1/2"
        />
      </div>

      <div class="flex space-x-8">
        <FormulateInput
          name="province"
          label="Province"
          class="w-1/2"
        />

        <FormulateInput
          name="postal_code"
          label="ZIP / Postal Code*"
          validation="required|number"
          class="w-1/2"
        />
      </div>

      <FormulateInput
        name="phone"
        label="Phone"
        class="w-full"
      />

      <div class="flex items-center justify-between mt-4">
        <div
          class="text-gray-500 flex items-center text-sm transform transition cursor-pointer"
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
        </div>

        <FormulateInput
          type="submit"
          label="Next"
          :disabled="hasErrors"
          input-class="btn-ui"
          class="mt-4"
        />
      </div>
    </FormulateForm>
  </checkout-step>
</template>

<script>
export default {
  name: 'Address',
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
    countries () {
      return this.$store.state.region.countries.map(country => ({ label: country.display_name, value: country.iso_2 }))
    }
  },
  methods: {
    submitHandler (data) {
      this.$store.dispatch('cart/updateCart', {
        shipping_address: data,
        email: this.$store.state.cart.email
      })
      this.$store.dispatch('cart/getCartShippingOptions')
      this.$emit('updateSteps', this.step)
    }
  }
}
</script>
