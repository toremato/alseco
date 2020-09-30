<template>
  <div class="">
    <record-form @save="addRecord" @cancel="onCancel"></record-form>
  </div>
</template>

<script>
import RecordForm from "@/components/RecordForm.vue";
export default {
  components: {
    RecordForm
  },

  data() {
    return {};
  },

  methods: {
    onCancel() {
      this.$router.push("/");
    },

    addRecord(record) {
      console.log("Adding new record: ", record);
      this.$store.dispatch("createRecord", record).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
