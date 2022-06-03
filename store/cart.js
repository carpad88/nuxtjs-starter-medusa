export const state = () => ({
  cart: {
    items: []
  }
})

export const getters = {
  items: state => state.cart.items,
  cartCurrencyCode: state => state.cart.region.currency_code
}

export const mutations = {
  SET_CART (state, cart) {
    state.cart = cart
    localStorage.setItem('cart_id', cart.id)
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
  }
}
