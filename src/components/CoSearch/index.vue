<template lang="html">
  <div class="co-search">
    <co-panel :cardName="title">
      <el-form
        :label-width="formLabelWidth"
        label-suffix="："
        :label-position="formLabelPosition"
        :model="searchForm"
      >
        <el-row :gutter="COL.GUTTER">
          <el-col
            :xs="COL.XS"
            :sm="COL.SM"
            :md="COL.MD"
            :lg="COL.LG"
            :xl="COL.XL"
            v-for="(item, index) in queryConditions"
            :key="index"
          >
            <el-form-item :prop="item.formItemName" :label="item.formItemLabel">
              <!-- 输入框 -->
              <el-input
                v-if="item.formItemType === 'INPUT'"
                v-model="searchForm[item.formItemName]"
                :placeholder="item.formItemPlaceholder || item.formItemLabel"
              ></el-input>
              <!-- 下拉选择 -->
              <el-select
                v-if="item.formItemType === 'SELECT'"
                v-model="searchForm[item.formItemName]"
                :placeholder="item.formItemPlaceholder || item.formItemLabel"
              >
                <el-option
                  v-for="option in item.formItemOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                >
                </el-option>
              </el-select>
              <!-- 日期 -->
              <el-date-picker
                v-if="item.formItemType === 'DATA_PICKER'"
                v-model="searchForm[item.formItemName]"
                :type="item.formItemELementType"
                :placeholder="item.formItemPlaceholder || item.formItemLabel"
              >
              </el-date-picker>
              <!-- 时间 -->
              <el-date-picker
                v-if="item.formItemType === 'DATA_TIME_PICKER'"
                v-model="searchForm[item.formItemName]"
                :type="item.formItemELementType"
                :range-separator="item.FormItemRangeSeparator"
                :start-placeholder="
                  item.FormItemStartPlaceholder || item.formItemLabel
                "
                :end-placeholder="
                  item.FormItemEndPlaceholder || item.formItemLabel
                "
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>

              <!-- 后期拓展：1、筛选条件过多，筛选表单可折叠；2、其他表单组件 -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="COL.GUTTER">
          <el-col
            :xs="COL.XS"
            :sm="COL.SM"
            :md="COL.MD"
            :lg="COL.LG"
            :xl="COL.XL"
          >
            <el-form-item>
              <el-button
                native-type="submit"
                size="small"
                type="primary"
                @click.native.prevent="handleSearch"
                icon="el-icon-search"
                class="co-search-btn"
                >查询</el-button
              >
              <slot class="operation" name="operation"></slot>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </co-panel>
  </div>
</template>

<script>
import { COL_CONSTANTS } from '@/constants';
import CoPanel from '../CoPanel';
export default {
  name: 'CoSearch',
  props: {
    // 命名空间
    namespace: {
      type: String,
      required: true,
    },
    // 搜索模块名称
    title: {
      type: String,
      required: true,
    },
    // 表单元素标签宽度
    formLabelWidth: {
      type: String,
      default: '120px',
    },
    // 表单元素标签对齐方式
    formLabelPosition: {
      type: String,
      default: 'right',
    },
    // 搜索条件
    queryConditions: {
      type: Array,
      required: true,
    },
    // 操作
    operations: {},
  },
  components: { CoPanel },
  computed: {
    COL() {
      return COL_CONSTANTS;
    },
    searchForm() {
      return this.$store.getters[`${this.namespace}/searchForm`];
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSearch() {
      this.$store.dispatch(`${this.namespace}/List`, {
        ...this.searchForm,
        page: 0,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
