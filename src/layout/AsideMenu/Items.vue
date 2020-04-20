<template>
  <div class="wrap-aside-items">
    <el-aside calss="aside-menu" width="240px">
      <!-- 菜单 -->
      <el-menu
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :router="router"
        :default-active="defaultActive"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <template v-for="(item, index) in data">
          <sub-item
            v-if="item.children"
            :key="`${index}`"
            :name="item.name"
            :icon="item.icon"
            :children="item.children"
            :parent="`${index}`"
          />
          <el-menu-item v-else :key="`${index}`" :index="`${index}`" :route="item.url">
            <i v-if="item.icon" :class="item.icon" />
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import SubItem from './SubItem.vue';

export default {
  name: 'Menus',
  components: { SubItem },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    backgroundColor: {
      type: String,
      default: null,
    },
    textColor: {
      type: String,
      default: null,
    },
    activeTextColor: {
      type: String,
      default: null,
    },
    router: {
      type: Boolean,
      default: false,
    },
    defaultActive: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    setCollapse(isCollapse) {
      this.isCollapse = isCollapse;
    },
  },
};
</script>

<style lang="scss">
.wrap-aside-items {
  // background-color: #3d4f62;
}
</style>
