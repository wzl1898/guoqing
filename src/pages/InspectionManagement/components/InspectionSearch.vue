<template>
  <el-form
    :model="searchCondition"
    size="small"
    inline
  >
    <el-form-item
      label="企业名称"
      prop="companyName"
    >
      <el-input
        v-model="searchCondition.companyName"
        placeholder="请输入企业名称"
        clearable
      />
    </el-form-item>
    <el-form-item
      label="巡查人"
      prop="inspector"
    >
      <el-input
        v-model="searchCondition.inspector"
        placeholder="请输入巡查人"
        clearable
      />
    </el-form-item>
    <el-form-item
      label="时间区间"
      prop="timeInterval"
    >
      <el-date-picker
        v-model="searchCondition.timeInterval"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleClickSearch"
      >
        查询
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'InspectionSearch',
  data () {
    return {
      searchCondition: {
        companyName: '', // 企业名称
        inspector: '', // 巡查人
        timeInterval: '' // 时间区间
      }
    }
  },
  methods: {
    /**
     * @event: click
     * 点击查询按钮
     */
    handleClickSearch () {
      console.log(this.searchCondition)
    }
  }
}
</script>
