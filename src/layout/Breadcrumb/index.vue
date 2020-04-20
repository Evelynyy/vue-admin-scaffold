<template>
  <el-breadcrumb class="wrap-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="breadcrumb in breadcrumbList"
      :key="breadcrumb"
      >{{ breadcrumb }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  computed: {
    breadcrumbList() {
      const { matched: routeMatched } = this.$route;
      return routeMatched.map(item => item.meta.label);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
