<template>
  <div>
    <div class="flex flex-col">
      <div class="w-1/2 flex mb-8 items-center">
        <span class="w-1/3 text-right mr-4">Фамилия</span>
        <input v-model="record.surname" type="text" class="info-input" />
      </div>
      <div class="w-1/2 flex mb-8 items-center">
        <span class="w-1/3 text-right mr-4">Имя</span>
        <input v-model="record.name" type="text" class="info-input" />
      </div>
      <div class="w-1/2 flex mb-8 items-center">
        <span class="w-1/3 text-right mr-4">Отчество</span>
        <input v-model="record.patronymic" type="text" class="info-input" />
      </div>

      <table class="table-fixed mt-12">
        <thead class="bg-gray-700 border border-gray-700 text-white">
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Стоимость</th>
            <th class="table-buttons"></th>
          </tr>
        </thead>
        <transition-group name="list" tag="tbody">
          <tr v-for="(item, index) in record.items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td><input v-model="item.name" type="text" class="w-full" /></td>
            <td>
              <input
                v-model="item.price"
                type="text"
                class="w-full text-right"
              />
            </td>
            <td class="table-buttons">
              <svg
                class="w-5 h-5 text-red-500 cursor-pointer fill-current hover:text-red-600"
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
                @click="removeRow(item.id)"
              >
                <path
                  d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm94.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                />
              </svg>
            </td>
          </tr>
          <tr key="total-row">
            <td colspan="2" class="text-right font-bold">Итого</td>
            <td class="text-right font-bold">{{ total }}</td>
            <td class="table-buttons">
              <svg
                class="w-5 h-5 text-green-500 cursor-pointer fill-current hover:text-green-600"
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
                @click="addRecordRow"
              >
                <path
                  d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0"
                />
              </svg>
            </td>
          </tr>
        </transition-group>
      </table>
      <div class="flex justify-center text-white mt-20">
        <button
          class="py-2 px-6 rounded bg-teal-400 hover:bg-teal-500"
          @click="saveRecord"
        >
          Сохранить
        </button>
        <button
          class="ml-6 py-2 px-6 rounded bg-gray-500 hover:bg-gray-600"
          @click="onCancel"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script>
let generateID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
export default {
  props: {
    record: {
      type: Object,
      default: () => {
        return {
          name: "",
          surname: "",
          patronymic: "",
          itemsCount: 1,
          totalPrice: 0,
          items: [
            {
              name: "",
              price: "",
              id: generateID()
            }
          ]
        };
      }
    }
  },

  data() {
    return {};
  },

  computed: {
    total() {
      let total = 0;

      for (let item of this.record.items) {
        total += +item.price;
      }

      return total;
    },
    itemsCount() {
      return this.record.items.length;
    }
  },

  watch: {
    total(newTotal) {
      this.record.totalPrice = newTotal;
    },

    itemsCount(newItemsCount) {
      this.record.itemsCount = newItemsCount;
    }
  },

  methods: {
    addRecordRow() {
      this.record.items.push({
        name: "",
        price: "",
        id: generateID()
      });
    },

    removeRow(id) {
      let index = this.record.items.findIndex(i => i.id === id);
      this.record.items.splice(index, 1);

      console.log("Index: ", index, this.record.items);
    },

    saveRecord() {
      this.$emit("save", this.record);
    },

    onCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";

table {
  td,
  th {
    &:not(.table-buttons) {
      border: 1px solid #cbd5e0;
    }
    &.table-buttons {
      width: 30px;
      padding-left: 10px;
      border: 1px solid $bg-app;
      background: $bg-app;
    }
  }
  thead {
    th {
      padding: 12px 0;
    }
  }
  tbody {
    tr:not(:last-child):hover {
      background: #edf2f7;
    }
    tr:last-child td:not(.table-buttons) {
      padding: 5px 15px;
    }
  }

  input {
    padding: 5px 15px;
    background: transparent;
    outline: none;
    border: 1px solid transparent;
    &:focus {
      border-color: #81e6d9;
      background: white;
    }
  }
}

.info-input {
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  outline: none;
  padding: 5px 10px;
  // width: 100px;

  &:focus {
    border-color: #81e6d9;
  }
}
</style>
