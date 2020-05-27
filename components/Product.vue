<template>
  <div class="card">
    <div class="card-body">
      <div v-if="!editMode">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">
          {{ product.price | money }} -
          {{ product.purchaseDate | date('YYYY-MM-DD') }}
        </p>
      </div>

      <form v-else>
        <div class="form-group">
          <input
            id="title"
            v-model="title"
            type="text"
            class="form-control"
            placeholder="title"
          />
        </div>
        <div class="form-group">
          <input
            id="price"
            v-model="price"
            type="number"
            class="form-control"
            placeholder="price"
          />
        </div>
        <div class="form-group">
          <input
            id="purchaseDate"
            v-model="purchaseDate"
            type="date"
            class="form-control"
            placeholder="Purchase Date"
          />
        </div>
      </form>
      <nuxt-link
        v-if="showDetailButton"
        :to="'/product/' + product.id"
        class="btn btn-primary"
        >More</nuxt-link
      >
      <button
        v-if="!editMode"
        type="button"
        class="btn btn-primary"
        @click="toggleEditMode(true)"
      >
        Edit
      </button>
      <button
        v-if="editMode"
        type="button"
        class="btn btn-default"
        @click="toggleEditMode(false)"
      >
        Cancel
      </button>
      <button
        v-if="editMode"
        type="button"
        class="btn btn-primary"
        @click="edit"
      >
        Update
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click="$emit('remove', product.id)"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
const form = {
  id: 0,
  title: '',
  price: 0,
  purchaseDate: ''
}
export default {
  props: ['product', 'showDetailButton'],
  data() {
    return {
      editMode: false,
      ...form
    }
  },
  methods: {
    toggleEditMode(mode) {
      this.editMode = mode
      Object.keys(form).forEach((key) => {
        if (key === 'purchaseDate') {
          this[key] = this.$options.filters.date(
            this.product[key],
            'YYYY-MM-DD'
          )
        } else {
          this[key] = this.product[key]
        }
      })
    },
    edit() {
      const { id, title, price, purchaseDate } = this
      this.$emit('update', { id, title, price, purchaseDate })
      this.editMode = false
    }
  }
}
</script>
