const REGION = 'medusa_region'
const COUNTRY = 'medusa_country'
const CART_ID = 'cart_id'

export const state = () => ({
  country: undefined,
  region: undefined,
  regions: []
})

export const mutations = {
  UPDATE_REGION (state, payload) {
    state.region = payload.region
    state.country = payload.country || payload.region.countries[0]
    localStorage.setItem(REGION, JSON.stringify(state.region))
    localStorage.setItem(COUNTRY, JSON.stringify(state.country))
  },
  SET_REGIONS (state, regions) {
    state.regions = regions
  }
}

export const actions = {
  async initializeRegions ({ commit }) {
    const { data: { regions } } = await this.$axios('/regions')
    commit('SET_REGIONS', regions)

    if (localStorage) {
      const regionJSON = localStorage.getItem(REGION)
      const countryJSON = localStorage.getItem(COUNTRY)

      if (regionJSON && countryJSON) {
        const region = JSON.parse(regionJSON)
        const country = JSON.parse(countryJSON)
        commit('UPDATE_REGION', {
          region,
          country
        })
      } else {
        commit('UPDATE_REGION', { region: regions[0] })
      }
    }
  },

  async initializeCart ({ state, commit }) {
    const existingCartId = localStorage ? localStorage.getItem(CART_ID) : undefined

    if (existingCartId) {
      try {
        const { data: { cart } } = await this.$axios(`/carts/${existingCartId}`)

        if (!cart.completed_at) {
          commit('cart/SET_CART', cart)
        }
      } catch (e) {
        localStorage.removeItem(CART_ID)
      }
    } else {
      const { cart } = await this.$axios.$post('/carts', { region_id: state.region.id, country_code: state.country.country_code })
      commit('cart/SET_CART', cart)
    }
  },

  updateRegion ({ state, commit, dispatch }, payload) {
    commit('UPDATE_REGION', payload)
    // dispatch('cart/updateCart', {
    //   region_id: state.region.id
    // })
  }
}
