<template>
  <div>
    <div class="flex flex-col">
      <div class="w-1/2 flex mb-8 items-center">
        <span class="w-1/3 text-right mr-4">Surname</span>
        <input v-model="record.surname" type="text" />
      </div>
      <div class="w-1/2 flex mb-8 items-center">
        <span class="w-1/3 text-right mr-4">Name</span>
        <input v-model="record.name" type="text" />
      </div>
      <div class="w-1/2 flex mb-8 items-center">
        <span class="w-1/3 text-right mr-4">Patronymic</span>
        <input v-model="record.patronymic" type="text" />
      </div>

      <table class="table-fixed">
        <thead>
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Стоимость</th>
          </tr>
        </thead>
        <!-- <tbody> -->
        <transition-group name="list" tag="tbody">
          <tr v-for="(item, index) in record.items" :key="item.id">
            <td @click="removeRow(item.id)">{{ index + 1 }}</td>
            <td><input v-model="item.name" type="text" class="w-full" /></td>
            <td>
              <input
                v-model="item.price"
                type="text"
                class="w-full text-right"
              />
            </td>
          </tr>
          <tr key="total-row">
            <td colspan="2" class="text-right font-bold">Итого</td>
            <td class="text-right font-bold">{{ total }}</td>
          </tr>
        </transition-group>

        <!-- </tbody> -->
      </table>
      <button @click="addRecordRow">+++</button>
      <button @click="editRecord">EDIT</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: {
        name: "",
        surname: "",
        patronymic: "",
        // total: 0,
        items: [
          {
            name: "",
            price: "",
            id: "lkn2oi3nfpwme"
          }
        ]
      }
    };
  },
  computed: {
    total() {
      let total = 0;

      for (let item of this.record.items) {
        total += +item.price;
      }

      return total;
    }
  },
  created() {
    console.log("Params: ", this.$route.params);
    this.record = this.$route.params.record;
  },
  methods: {
    addRecordRow() {
      let id =
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      this.record.items.push({
        name: "",
        price: "",
        id
      });
    },
    removeRow(id) {
      let index = this.record.items.findIndex(i => i.id === id);
      this.record.items.splice(index, 1);

      console.log("Index: ", index, this.record.items);
    },
    editRecord() {
      this.record.total = this.total;
      this.$store.dispatch("editRecord", this.record).then(() => {
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  td,
  th {
    border: 1px solid grey;
  }
  tbody tr:not(:last-child):hover {
    background: lightgrey;
  }

  tbody tr:last-child td {
    padding: 5px 15px;
  }
}
input {
  padding: 5px 15px;
  &:focus {
    outline: none;
  }
}
table {
  background: white;
  input {
    background-color: transparent;

    &:focus {
      background: rgba($color: white, $alpha: 0.5);
    }
  }
}
</style>
