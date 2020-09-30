<template>
  <div>
    <filters @change="(page = 1), (sortBy = 'surname')"></filters>
    <table
      id="main-table"
      class="w-full table-fixed border-collapse bg-white select-none"
    >
      <caption>
        Список сотрудников
      </caption>
      <thead class="bg-gray-700 text-white">
        <tr>
          <th class="w-2/5" @click="changeSorting('surname')">
            <div class="flex w-full h-full justify-center items-center">
              ФИО сотрудника
              <svg
                class="w-4 h-4 fill-current text-gray-300 ml-2"
                viewBox="0 0 401.998 401.998"
              >
                <path
                  :class="{
                    'sorting-active': sortBy === 'surname'
                  }"
                  d="M73.092,164.452h255.813c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.427-7.898,5.427-12.847
			c0-4.949-1.813-9.229-5.427-12.85L213.846,5.424C210.232,1.812,205.951,0,200.999,0s-9.233,1.812-12.85,5.424L60.242,133.331
			c-3.617,3.617-5.424,7.901-5.424,12.85c0,4.948,1.807,9.231,5.424,12.847C63.863,162.645,68.144,164.452,73.092,164.452z"
                />
                <path
                  :class="{
                    'sorting-active': sortBy === '-surname'
                  }"
                  d="M328.905,237.549H73.092c-4.952,0-9.233,1.808-12.85,5.421c-3.617,3.617-5.424,7.898-5.424,12.847
			c0,4.949,1.807,9.233,5.424,12.848L188.149,396.57c3.621,3.617,7.902,5.428,12.85,5.428s9.233-1.811,12.847-5.428l127.907-127.906
			c3.613-3.614,5.427-7.898,5.427-12.848c0-4.948-1.813-9.229-5.427-12.847C338.139,239.353,333.854,237.549,328.905,237.549z"
                />
              </svg>
            </div>
          </th>
          <th @click="changeSorting('itemsCount')">
            <div class="flex w-full h-full justify-center items-center">
              Кол-во предметов
              <svg
                class="w-4 h-4 fill-current text-gray-300 ml-2"
                viewBox="0 0 401.998 401.998"
              >
                <path
                  :class="{
                    'sorting-active': sortBy === 'itemsCount'
                  }"
                  d="M73.092,164.452h255.813c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.427-7.898,5.427-12.847
			c0-4.949-1.813-9.229-5.427-12.85L213.846,5.424C210.232,1.812,205.951,0,200.999,0s-9.233,1.812-12.85,5.424L60.242,133.331
			c-3.617,3.617-5.424,7.901-5.424,12.85c0,4.948,1.807,9.231,5.424,12.847C63.863,162.645,68.144,164.452,73.092,164.452z"
                />
                <path
                  :class="{
                    'sorting-active': sortBy === '-itemsCount'
                  }"
                  d="M328.905,237.549H73.092c-4.952,0-9.233,1.808-12.85,5.421c-3.617,3.617-5.424,7.898-5.424,12.847
			c0,4.949,1.807,9.233,5.424,12.848L188.149,396.57c3.621,3.617,7.902,5.428,12.85,5.428s9.233-1.811,12.847-5.428l127.907-127.906
			c3.613-3.614,5.427-7.898,5.427-12.848c0-4.948-1.813-9.229-5.427-12.847C338.139,239.353,333.854,237.549,328.905,237.549z"
                />
              </svg>
            </div>
          </th>
          <th class="w-2/5" @click="changeSorting('totalPrice')">
            <div class="flex w-full h-full justify-center items-center">
              Общая стоимость
              <svg
                class="w-4 h-4 fill-current text-gray-300 ml-2"
                viewBox="0 0 401.998 401.998"
              >
                <path
                  :class="{
                    'sorting-active': sortBy === 'totalPrice'
                  }"
                  d="M73.092,164.452h255.813c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.427-7.898,5.427-12.847
			c0-4.949-1.813-9.229-5.427-12.85L213.846,5.424C210.232,1.812,205.951,0,200.999,0s-9.233,1.812-12.85,5.424L60.242,133.331
			c-3.617,3.617-5.424,7.901-5.424,12.85c0,4.948,1.807,9.231,5.424,12.847C63.863,162.645,68.144,164.452,73.092,164.452z"
                />
                <path
                  :class="{
                    'sorting-active': sortBy === '-totalPrice'
                  }"
                  d="M328.905,237.549H73.092c-4.952,0-9.233,1.808-12.85,5.421c-3.617,3.617-5.424,7.898-5.424,12.847
			c0,4.949,1.807,9.233,5.424,12.848L188.149,396.57c3.621,3.617,7.902,5.428,12.85,5.428s9.233-1.811,12.847-5.428l127.907-127.906
			c3.613-3.614,5.427-7.898,5.427-12.848c0-4.948-1.813-9.229-5.427-12.847C338.139,239.353,333.854,237.549,328.905,237.549z"
                />
              </svg>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="records.length">
        <tr
          v-for="record in records"
          :key="record.id"
          @click="toggleRow"
          @dblclick="onDoubleClick(record)"
          @contextmenu.prevent="e => openContextMenu(e, record)"
        >
          <td>{{ formatName(record) }}</td>
          <td>{{ record.items.length }}</td>
          <td>{{ formatPrice(record.totalPrice) }}</td>
        </tr>
        <tr
          v-for="empty in 10 - records.length"
          :key="empty"
          class="empty-row opacity-0 border-none"
        >
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td
            rowspan="5"
            colspan="3"
            class="hover:bg-white"
            style="height: 410px"
          >
            Нет записей
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-buttons flex justify-end items-center mt-6">
      <span v-if="pagesCount" class="mr-4">
        Стр. {{ page }} из {{ pagesCount }}
      </span>
      <button
        :disabled="!pagesCount || page === 1"
        class="w-8 h-8 mr-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
        @click="changePage(-1)"
      >
        <svg
          class="w-4 h-4 fill-current color-white transform rotate-180"
          viewBox="0 0 320.001 320.001"
        >
          <path
            d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
	c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
	c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"
          />
        </svg>
      </button>
      <button
        :disabled="!pagesCount || page === pagesCount"
        class="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
        @click="changePage(+1)"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 320.001 320.001">
          <path
            d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
	c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
	c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"
          />
        </svg>
      </button>
    </div>
    <div class="mt-12">
      <button
        class="px-6 py-2 rounded text-white bg-teal-400 hover:bg-teal-500 focus:outline-none"
        @click="addNewRecord"
      >
        Добавить
      </button>
    </div>
    <context-menu
      :show="showContextMenu"
      :position="contextMenuPosition"
      @mouseleave="closeContextMenu"
    >
      <div class="w-64 bg-white border flex flex-col shadow-lg">
        <div
          class="cursor-pointer hover:bg-gray-200 py-3 border-b"
          @click="confirmDeletion"
        >
          Удалить
        </div>
        <transition name="slide-down">
          <div v-if="confirmation" class="">
            <div class="my-4">Вы уверены?</div>
            <div class="flex">
              <div
                class="w-1/2 flex justify-center py-3 cursor-pointer hover:bg-gray-200 text-red-400"
                @click="deleteRecord"
              >
                Да
              </div>
              <div
                class="w-1/2 flex justify-center py-3 cursor-pointer hover:bg-gray-200"
                @click="closeContextMenu"
              >
                Нет
              </div>
            </div>
          </div>
        </transition>
      </div>
    </context-menu>
  </div>
</template>

<script>
import ContextMenu from "@/components/ContextMenu.vue";
import Filters from "@/components/Filters.vue";

export default {
  components: { ContextMenu, Filters },
  data() {
    return {
      showContextMenu: false,
      focusedRecord: {},
      contextMenuPosition: {
        x: "0px",
        y: "0px"
      },
      sortBy: "surname",
      page: 1,
      confirmation: false
    };
  },

  computed: {
    records() {
      return this.$store.getters.currentRecords;
    },

    pagesCount() {
      return Math.ceil(this.$store.getters.visibleRecords.length / 10);
    }
  },

  methods: {
    // LOCAL HELPER FUNCTIONS

    formatName(record) {
      let patronymic = record.patronymic
        ? record.patronymic.charAt(0) + "."
        : "";
      return `${record.surname} ${record.name.charAt(0)}.${patronymic}`;
    },

    formatPrice(price) {
      let array = String(price)
        .split("")
        .reverse();
      if (array.length > 3) {
        array.splice(3, 0, " ");
      }
      if (array.length > 7) {
        array.splice(7, 0, " ");
      }

      return array.reverse().join("");
    },

    // USER INTERFACE

    openContextMenu(e, record) {
      this.contextMenuPosition = {
        x: e.x - 2 + "px",
        y: e.y - 2 + "px"
      };
      this.showContextMenu = true;
      this.focusedRecord = record;
    },

    closeContextMenu() {
      this.showContextMenu = false;
      this.confirmation = false;
    },

    toggleRow(e) {
      const currentRow = e.path[1];
      const table = document.querySelector("#main-table");
      const rows = table.getElementsByTagName("tr");

      for (let row of rows) {
        if (row != currentRow) {
          row.classList.remove("selected-row");
        }
      }
      currentRow.classList.toggle("selected-row");
    },

    // MAIN LOGIC

    confirmDeletion() {
      this.confirmation = true;
    },

    deleteRecord() {
      this.$store.dispatch("deleteRecord", this.focusedRecord);
      this.closeContextMenu();
    },

    onDoubleClick(record) {
      console.log("Double");
      this.$router.push({ name: "EditRecord", params: { record } });
    },

    addNewRecord() {
      this.$router.push({ name: "NewRecord" });
    },

    changeSorting(newSort) {
      if (this.sortBy.includes(newSort)) {
        if (this.sortBy.charAt(0) === "-") {
          this.sortBy = newSort;
        } else {
          this.sortBy = "-" + newSort;
        }
      } else {
        this.sortBy = newSort;
      }

      this.$store.dispatch("sortRecords", this.sortBy);
      this.page = 1;
    },

    changePage(increment) {
      this.page += increment;
      this.$store.dispatch("paginateRecords", this.page);
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  border: 1px solid #cbd5e0;

  caption {
    margin-bottom: 20px;
    font-weight: 600;
  }
  td,
  th {
    border: 1px solid #cbd5e0;
  }
  .empty-row {
    td {
      border-color: transparent;
    }
  }
  thead {
    th {
      cursor: pointer;
      padding: 12px 0;
    }
  }
  tbody {
    tr:hover {
      background: #edf2f7;
    }
    td {
      padding: 8px 0;
    }
  }
}
.sorting-active {
  color: #fc8181;
}
.selected-row {
  background: #e2e8f0 !important;
}
</style>
