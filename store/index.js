export const state = () => ({
  products: [],
  activeProductId: null,
  activePage: 0,
  pageSize: 2
})

export const getters = {
  pages(state) {
    return Math.round(state.products.length / state.pageSize)
  },
  activeProduct(state) {
    return state.products.find((p) => +p.id === +state.activeProductId)
  }
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },

  SET_ACTIVE_PRODUCT_ID(state, id) {
    state.activeProductId = id
  },

  CREATE_PRODUCT(state, product) {
    state.products = state.products.concat(product)
  },

  UPDATE_PRODUCT(state, product) {
    state.products = state.products.map((p) =>
      +p.id === +product.id ? product : p
    )
  },

  DELETE_PRODUCT(state, id) {
    state.products = state.products.filter((p) => +p.id !== +id)
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('GET_PRODUCTS')
  },

  async GET_PRODUCTS({ commit }) {
    const { products } = await this.$axios.$get('data.json')
    commit('SET_PRODUCTS', products)
  }
}
