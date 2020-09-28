<template>
  <div class="flex m-auto flex flex-col">
    <table id="main-table" class="w-full table-fixed border-collapse bg-white select-none">
      <thead class="bg-teal-200">
        <tr>
          <th class="w-2/5">ФИО</th>
          <th>Количество</th>
          <th class="w-2/5">Общая стоимость</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in records"
          :key="record.name"
          @click="toggleRow"
          @dblclick="onDoubleClick(record)"
          @contextmenu.prevent="test"
        >
          <td>{{ record.name }}</td>
          <td>{{ record.items.length }}</td>
          <td>{{ record.total }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-20">
      <button
        class="px-4 py-2 rounded text-white bg-teal-400 hover:bg-teal-500 focus:outline-none"
        @click="addNewRecord"
      >Добавить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [
        {
          name: "Пупкин В.С",
          itemsCount: 2,
          total: 124301
        },
        {
          name: "Маратов А.К",
          itemsCount: 3,
          total: 300000
        },
        {
          name: "Маратова Д.Б",
          itemsCount: 1,
          total: 120000
        },
        {
          name: "Калдыбаев К.М",
          itemsCount: 2,
          total: 25000
        },
        {
          name: "Кунанбаев А",
          itemsCount: 4,
          total: 1430500
        }
      ]
    };
  },
  computed: {
    records() {
      return this.$store.state.records;
    }
  },
  created() {
    this.$nextTick(() => {
      // this.highlightRows();
    });
  },
  methods: {
    test() {
      console.log("Delete");
    },
    removeRecord(emp) {
      // this.employees.splice(emp, 1);
      console.log(emp);
    },
    highlightRows() {
      let table = document.querySelector("#main-table");
      let rows = table.getElementsByTagName("tr");

      for (let row of rows) {
        row.onclick = () => {
          for (let each of rows) {
            each.classList.remove("selected-row");
          }
          row.classList.add("selected-row");
        };
      }
    },
    toggleRow(e) {
      console.log("Toggle: ", e.path[1], e);
      let currentRow = e.path[1];
      let table = document.querySelector("#main-table");
      let rows = table.getElementsByTagName("tr");

      for (let row of rows) {
        if (row != currentRow) {
          row.classList.remove("selected-row");
        }
      }
      currentRow.classList.toggle("selected-row");
    },
    onDoubleClick(record) {
      console.log("Double");
      this.$router.push({ name: "EditRecord", params: { record } });
    },
    addNewRecord() {
      this.$router.push({ name: "NewRecord" });
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
  tbody tr:hover {
    background: lightgrey;
  }
}
.selected-row {
  background: lightcyan !important;
}
</style>
