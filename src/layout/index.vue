<template lang="html">
  <el-container id="layout">
    <!-- 布局容器 -->
    <aside-menu></aside-menu>
    <el-main class="main">
      <layout-breadcrumb></layout-breadcrumb>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from './AsideMenu';
import LayoutBreadcrumb from './Breadcrumb';
export default {
  name: 'layout',
  components: { AsideMenu, LayoutBreadcrumb },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
