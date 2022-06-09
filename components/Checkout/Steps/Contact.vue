<template>
  <checkout-step title="Contact" :show-success-icon="isCompleted">
    <FormulateForm
      v-show="isOpen"
      v-slot="{ hasErrors }"
      class="mt-4"
      @submit="submitHandler"
    >
      <FormulateInput
        type="email"
        label="Email"
        name="email"
        class="w-full"
        validation="bail|required|email"
      />
      <div class="flex items-center justify-end mt-6">
        <FormulateInput
          type="submit"
          label="Next"
          :disabled="hasErrors"
          input-class="btn-ui"
        />
      </div>
    </FormulateForm>
  </checkout-step>
</template>

<script>
export default {
  name: 'Contact',
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
  methods: {
    submitHandler (data) {
      this.$store.commit('cart/SET_CART_EMAIL', data.email)
      this.$emit('updateSteps', this.step)
    }
  }
}
</script>
