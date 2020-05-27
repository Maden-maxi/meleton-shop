<template>
  <div class="row">
    <div v-if="product" class="col">
      <nuxt-link :to="'/'" class="btn btn-primary">Go to list</nuxt-link>
      <Product
        :product="product"
        @remove="removeProduct"
        @update="updateProduct"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Product from '~/components/Product.vue'
export default {
  components: {
    Product
  },
  computed: mapGetters({ product: 'activeProduct' }),
  middleware({ store, params }) {
    store.commit('SET_ACTIVE_PRODUCT_ID', params.id)
  },
  methods: {
    removeProduct(id) {
      if (confirm('Confirm product deletion')) {
        this.$store.commit('DELETE_PRODUCT', id)
        this.$router.push({ path: '/' })
      }
    },
    updateProduct(product) {
      this.$store.commit('UPDATE_PRODUCT', product)
    }
  }
}
</script>
