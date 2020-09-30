<template>
  <div>
    <record-form
      :record="record"
      @cancel="onCancel"
      @save="editRecord"
    ></record-form>
  </div>
</template>

<script>
import RecordForm from "@/components/RecordForm.vue";

export default {
  components: {
    RecordForm
  },

  data() {
    return {
      record: {
        name: "",
        surname: "",
        patronymic: "",
        itemsCount: 1,
        totalPrice: 0,
        items: [
          {
            name: "",
            price: "",
            id: ""
          }
        ]
      }
    };
  },

  created() {
    this.record = this.$route.params.record;
  },

  methods: {
    onCancel() {
      this.$router.push("/");
    },

    editRecord(record) {
      this.$store.dispatch("editRecord", record).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
