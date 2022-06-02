const REGION = 'medusa_region'
const COUNTRY = 'medusa_country'

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

  updateRegion ({ state, commit, dispatch }, payload) {
    commit('UPDATE_REGION', payload)
    // dispatch('cart/updateCart', {
    //   region_id: state.region.id
    // })
  }
}
