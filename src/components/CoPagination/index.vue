<template lang="html">
  <div class="co-pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="stateList.currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="stateList.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="stateList.count"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CoPagination',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  components: {},
  computed: {
    stateForm() {
      return this.$store.getters[`${this.namespace}/form`];
    },
    stateList() {
      return this.$store.getters[`${this.namespace}/resData`];
    },
  },
  data() {
    return {};
  },
  methods: {
    handleCurrentChange(page) {
      this.$store.dispatch(`${this.namespace}/List`, {
        ...this.stateForm,
        currentPage: page,
      });
    },
    handleSizeChange(size) {
      this.$store.dispatch(`${this.namespace}/List`, {
        ...this.stateForm,
        pageSize: size,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
