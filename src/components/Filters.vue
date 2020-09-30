<template>
  <div class="flex flex-col mb-10 text-sm">
    <div class="filters flex flex-col">
      <div class="flex justify-end items-center mb-3">
        Количество предметов:
        <input v-model="filters.count.from" type="text" class="ml-2 rounded" />
        <span class="mx-2 h-px w-2 border border-gray-500"></span>
        <input v-model="filters.count.to" type="text" class="rounded" />
      </div>
      <div class="flex justify-end items-center">
        Общая стоимость:
        <input v-model="filters.price.from" type="text" class="ml-2 rounded" />
        <span class="mx-2 h-px w-2 border border-gray-500"></span>
        <input v-model="filters.price.to" type="text" class="rounded" />
      </div>
    </div>
    <div class="flex justify-end mt-6 text-white">
      <button
        class="py-1 rounded bg-teal-400 hover:bg-teal-500"
        @click="applyFilters"
      >
        Применить
      </button>
      <button
        class="py-1 rounded bg-gray-500 hover:bg-gray-600 ml-6"
        @click="resetFilters"
      >
        Сбросить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        count: {
          from: null,
          to: null
        },
        price: {
          from: null,
          to: null
        }
      }
    };
  },

  methods: {
    applyFilters() {
      this.$store.dispatch("filterRecords", this.filters);
      this.$emit("change");
    },

    resetFilters() {
      this.filters = {
        count: {
          from: null,
          to: null
        },
        price: {
          from: null,
          to: null
        }
      };
      this.$store.dispatch("resetFilters");
      this.$emit("change");
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #cbd5e0;
  outline: none;
  padding: 5px 10px;
  width: 100px;

  &:focus {
    border-color: #81e6d9;
  }
}
button {
  width: 100px;
  padding: 5px 0;
}
</style>
