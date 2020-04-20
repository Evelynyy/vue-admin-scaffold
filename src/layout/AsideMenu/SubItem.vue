<template lang="html">
  <el-submenu :index="parent">
    <!-- 子菜单 -->
    <template slot="title">
      <i v-if="icon" :class="icon" />
      <span>{{ name }}</span>
    </template>
    <template v-for="(item, index) in children">
  <submenu
    v-if="item.children"
    :key="`${parent}${index}`"
    :name="item.name"
    :icon="item.icon"
    :children="item.children"
    :parent="`${parent}${index}`"
  />
  <!-- 递归 -->
  <el-menu-item v-else :key="`${parent}${index}`" :index="`${parent}${index}`" :route="item.url">
    <i v-if="item.icon" :class="item.icon" />
    <span slot="title">{{ item.name }}</span>
  </el-menu-item>
</template>
  </el-submenu>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    name: {
      required: true,
    },
    icon: String,
    children: {
      type: Array,
      required: true,
    },
    parent: {
      // 父菜单的key，作为当前key的前缀
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
