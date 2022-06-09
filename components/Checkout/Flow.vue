<template>
  <div class="flex flex-col">
    <component
      :is="step.component"
      v-for="(step, stepIndex) in checkoutSteps"
      :key="step.component"
      :is-open="step.isOpen"
      :is-completed="step.isCompleted"
      :step="stepIndex"
      @updateSteps="updateSteps"
    />
  </div>
</template>

<script>
import { formatPrice } from '@/utils/format-price'

export default {
  name: 'CheckoutFlow',
  data () {
    return {
      checkoutSteps: [
        {
          component: 'checkout-steps-contact',
          isCompleted: false,
          isOpen: true
        },
        {
          component: 'checkout-steps-address',
          isCompleted: false,
          isOpen: false
        },
        {
          component: 'checkout-steps-delivery',
          isCompleted: false,
          isOpen: false
        },
        {
          component: 'checkout-steps-payment',
          isCompleted: false,
          isOpen: false
        }
      ]
    }
  },
  methods: {
    formatPrice,
    updateSteps (current, forward = true) {
      this.checkoutSteps[current].isOpen = false
      this.checkoutSteps[current].isCompleted = forward

      const nextOrBefore = forward ? current + 1 : current - 1
      this.checkoutSteps[nextOrBefore].isOpen = true

      if (!forward && nextOrBefore === 0) {
        this.checkoutSteps[nextOrBefore].isCompleted = false
      }
    }
  }
}
</script>

<style lang="scss">
.formulate-input {

  &-label {
    @apply font-semibold text-sm mb-3 block
  }

  &-element > input {
    @apply shadow rounded-md px-4 py-2 text-xs w-full border-transparent
  }

  &-element > select {
    @apply shadow rounded-md px-4 py-2 text-xs w-full border-transparent bg-white
  }

  &-element > select > option {
    @apply bg-gray-100
  }

  &-error {
    @apply text-red-500 text-xs mt-2;
  }
}
</style>
