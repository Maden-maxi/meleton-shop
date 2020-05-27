<template>
  <form class="mb-3">
    <div class="form-row">
      <div class="col">
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-control"
          placeholder="title"
        />
      </div>
      <div class="col">
        <input
          id="price"
          v-model="price"
          type="number"
          class="form-control"
          placeholder="price"
        />
      </div>
      <div class="col">
        <input
          id="purchaseDate"
          v-model="purchaseDate"
          type="date"
          class="form-control"
          placeholder="Purchase Date"
        />
      </div>
      <div class="col">
        <button type="button" class="btn btn-success w-100" @click="create">
          Add product
        </button>
      </div>
      <div class="col">
        <button type="button" class="btn btn-danger w-100" @click="resetForm">
          Reset
        </button>
      </div>
      <div class="col" @click="cancel">
        <button type="button" class="btn btn-secondary w-100">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
const form = {
  title: '',
  price: '',
  purchaseDate: ''
}
export default {
  data() {
    return {
      ...form
    }
  },
  methods: {
    resetForm() {
      Object.keys(form).forEach((key) => (this[key] = form[key]))
    },
    cancel() {
      this.resetForm()
      this.$emit('cancel')
    },
    create() {
      const { title, price, purchaseDate } = this
      this.$emit('add', { title, price, purchaseDate })
      this.resetForm()
    }
  }
}
</script>
