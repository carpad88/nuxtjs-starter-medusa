export const state = () => ({
  cart: {
    items: []
  },
  email: 'henry@medusa.com',
  shippingOptions: []
})

export const getters = {
  items: state => state.cart.items,
  cartCurrencyCode: state => state.cart.region.currency_code,
  shippingOptions: state => state.shippingOptions,
  shippingMethod: state => state.cart.shipping_methods[0]?.shipping_option_id,
  paymentProviders: state => state.cart.payment_sessions || [],
  clientSecret: state => state.cart.payment_session?.data.client_secret || null
}

export const mutations = {
  SET_CART (state, cart) {
    state.cart = cart
    localStorage.setItem('cart_id', cart.id)
  },

  SET_CART_EMAIL (state, email) {
    state.email = email
  },

  SET_SHIPPING_OPTIONS (state, shippingOptions) {
    state.shippingOptions = shippingOptions
  }
}

export const actions = {
  async updateCart ({ state, commit }, payload) {
    const { cart } = await this.$axios.$post(`/carts/${state.cart.id}`, { ...payload })
    commit('SET_CART', cart)
  },

  async addItem ({ state, commit }, item) {
    let cartId = state.cart.id

    if (!cartId) {
      const { cart: newCart } = await this.$axios.$post('/carts')
      commit('SET_CART', newCart)
      cartId = newCart.id
    }

    const { cart: updateCart } = await this.$axios.$post(`/carts/${cartId}/line-items`, { ...item })
    commit('SET_CART', updateCart)
  },

  async removeItem ({ state, commit }, itemId) {
    const { cart } = await this.$axios.$delete(`/carts/${state.cart.id}/line-items/${itemId}`)
    commit('SET_CART', cart)
  },

  async updateQuantity ({ state, commit }, item) {
    const { cart } = await this.$axios.$post(`/carts/${state.cart.id}/line-items/${item.id}`, { quantity: item.quantity })
    commit('SET_CART', cart)
  },

  async getCartShippingOptions ({ state, commit }) {
    const { data: { shipping_options: options } } = await this.$axios(`/shipping-options/${state.cart.id}`)
    commit('SET_SHIPPING_OPTIONS', options)
  },

  async addShippingMethod ({ state, commit }, optionId) {
    const { cart } = await this.$axios.$post(`/carts/${state.cart.id}/shipping-methods`, { option_id: optionId })
    commit('SET_CART', cart)
  },

  async createPaymentSession ({ state, commit }) {
    const { cart } = await this.$axios.$post(`/carts/${state.cart.id}/payment-sessions`)
    commit('SET_CART', cart)
  },

  async setPaymentSession ({ state, commit }, providerId) {
    const { cart } = await this.$axios.$post(`/carts/${state.cart.id}/payment-session`, { provider_id: providerId })
    commit('SET_CART', cart)
  },

  async completeCart ({ state, commit }) {
    const { type, data: order } = await this.$axios.$post(`/carts/${state.cart.id}/complete`)

    if (type === 'order') {
      const { cart } = await this.$axios.$post('/carts')
      commit('SET_CART', cart)

      return order
    }
  }
}
