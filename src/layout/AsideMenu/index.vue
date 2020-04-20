<template lang="html">
  <el-aside class="wrap-aside" :width="`${width}px`">
    <!-- 左侧栏 -->
    <el-container>
      <el-header class="header">
        <span v-if="!isCollapse">XXXX系统</span>
        <el-link
          class="collapse-button"
          type="info"
          :icon="collapseIcon"
          :underline="false"
          @click="toggleCollapse"
        />
      </el-header>
      <el-main class="menu-wrapper">
        <items
          :data="menus"
          background-color="#545c64"
          active-text-color="#fff"
          text-color="#fff"
          router
          default-active="0"
          ref="menus"
        />
      </el-main>
    </el-container>
  </el-aside>
</template>

<script>
import Items from './Items';
import { mapGetters } from 'vuex';

const MIN_WIDTH = 64; // 最小宽度
const MAX_WIDTH = process.env.VUE_APP_ASIDE_WIDTH || 240; // 最大宽度
const ARROW_LEFT_ICON = 'el-icon-s-fold'; // 向左箭头图标
const ARROW_RIGHT_ICON = 'el-icon-s-unfold'; // 向右箭头图标

const namespace = 'user';

export default {
  name: 'my-aside',
  components: { Items },
  data() {
    return {
      isCollapse: false,
      collapseIcon: ARROW_LEFT_ICON,
    };
  },
  computed: {
    ...mapGetters(namespace, ['menus']),
    width() {
      return this.isCollapse ? MIN_WIDTH : MAX_WIDTH;
    },
  },
  methods: {
    toggleCollapse() {
      // 菜单缩进
      if (this.isCollapse) {
        this.isCollapse = false;
        this.collapseIcon = ARROW_LEFT_ICON;
      } else {
        this.isCollapse = true;
        this.collapseIcon = ARROW_RIGHT_ICON;
      }
      this.$refs.menus.setCollapse(this.isCollapse);
    },
  },
};
</script>

<style lang="scss">
@import './index.scss';
</style>
