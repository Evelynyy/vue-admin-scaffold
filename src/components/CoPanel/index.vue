<template>
  <el-card :class="{ panel: true }" :style="{ paddingBottom: withPaddingBottom + 'px' }">
    <div slot="header" class="clearfix">
      <span>{{ cardName }}</span>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'CoPanel',
  props: {
    // 搜索模块名称
    withPaddingBottom: {
      type: [String, Number],
      default: 22,
    },
    cardName: {
      type: String,
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
