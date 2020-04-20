<template lang="html">
  <div class="co-table">
    <el-table
      :data="tableData"
      :max-height="tableMaxHeight"
      stripe
      border
      :size="tableSize"
      @expand-change="tableExpandChange"
      v-loading="loading"
      :class="[tableClassName]"
    >
      <!-- 查询结果列表 -->
      <el-table-column v-if="tableColumnExpandSlot" type="expand">
        <!-- 展开列 -->
        <template slot-scope="{ row }">
          <slot :name="tableColumnExpandSlot" :row="row" />
        </template>
      </el-table-column>

      <el-table-column
        v-if="tableOperations"
        :label="tableOperationParams.columnLabel"
        :width="tableOperationParams.columnWidth"
        :fixed="tableOperationParams.columnAlign"
      >
        <!-- 操作列 -->
        <template slot-scope="{ row }">
          <slot :name="tableColumnOperationSlot" :row="row" />
        </template>
      </el-table-column>

      <el-table-column
        v-for="({
          columnName,
          columnLable,
          columnWidth = 0,
          showOverflowTooltip = false,
          formatter,
          slotName,
        },
        index) in tableColumns"
        :key="index"
        :label="columnLable"
        :prop="columnName"
        :min-width="columnWidth"
        :show-overflow-tooltip="showOverflowTooltip"
      >
        <!-- 自定义列 -->
        <template slot-scope="{ row }">
          <!-- 使用formatter格式化方法 -->
          <span v-if="formatter">{{ formatter(row[columnName]) }}</span>
          <!-- 使用插槽 -->
          <slot v-else-if="slotName" :name="slotName" :row="row" />
          <!-- 仅渲染值 -->
          <span v-else>{{ row[columnName] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CoTable',
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    // 表格最大高度
    tableMaxHeight: {
      type: String,
    },
    // 表格尺寸
    tableSize: {
      type: String,
      default: 'medium',
    },
    // 表格展开函数
    tableExpandChange: {
      type: Function,
      default: () => {},
    },
    // loading
    loading: {
      type: Boolean,
    },
    // 自定义表格类名
    tableClassName: {
      type: String,
    },
    // 展开插槽名称
    tableColumnExpandSlot: {
      type: String,
    },
    // 是否有操作列
    tableOperations: {
      type: Boolean,
      default: false,
    },
    // 操作列参数
    tableOperationParams: {
      type: Object,
    },
    // 操作列插槽名称
    tableColumnOperationSlot: {
      type: String,
    },
    // 表格参数
    tableColumns: {
      type: Array,
      required: true,
    },
  },
  components: {},
  computed: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
