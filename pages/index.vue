<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col">
          <div class="row">
            <div class="col-6">
              <paginate
                v-model="page"
                :page-count="pages"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :click-handler="updateQuery"
                container-class="pagination"
                page-class="page-item"
                page-link-class="page-link"
                prev-class="page-item"
                next-class="page-item"
                prev-link-class="page-link"
                next-link-class="page-link"
              ></paginate>
            </div>
            <div class="col-3">
              <select
                v-model="orderBy"
                class="custom-select"
                @change="updateQuery"
              >
                <option disabled value="">Please select one</option>
                <option value="price">Price</option>
                <option value="purchaseDate">Purchase Date</option>
              </select>
            </div>
            <div class="col-3">
              <select
                v-model="orderDirection"
                class="custom-select"
                @change="updateQuery"
              >
                <option disabled value="">Please select one</option>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-2">
        <div
          v-for="product in visibleProducts"
          :key="product.id"
          class="col mb-4"
        >
          <Product
            :product="product"
            :show-detail-button="true"
            @remove="removeProduct"
            @update="updateProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Paginate from '~/components/Paginate.vue'
import Product from '~/components/Product.vue'

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!key) {
      // property doesn't exist on either object
      return 0
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return order === 'desc' ? comparison * -1 : comparison
  }
}

export default {
  components: {
    Paginate,
    Product
  },
  data() {
    const page = +this.$route.query.page || 0
    return {
      page,
      orderBy: this.$route.query.orderBy || '',
      orderDirection: this.$route.query.orderDirection || ''
    }
  },
  computed: {
    ...mapState(['products', 'pageSize']),
    ...mapGetters(['pages']),
    visibleProducts() {
      const products = Object.assign([], this.products)
      const page = !this.page ? this.page : this.page - 1
      return products
        .sort(compareValues(this.orderBy, this.orderDirection))
        .splice(page * this.pageSize, this.pageSize)
    }
  },
  methods: {
    updateQuery() {
      this.$router.push({
        query: {
          page: this.page,
          orderBy: this.orderBy,
          orderDirection: this.orderDirection
        }
      })
    },
    removeProduct(id) {
      if (confirm('Confirm product deletion')) {
        this.$store.commit('DELETE_PRODUCT', id)
      }
    },
    updateProduct(product) {
      this.$store.commit('UPDATE_PRODUCT', product)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
