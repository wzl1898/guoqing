<template>
  <div class="inspection_container">
    <EliTitle
      title="巡查管理"
    />
    <InspectionSearch class="inspection_container_search" />
    <div class="inspection_container_set">
      <el-button
        size="small"
        type="primary"
      >
        文本项目配置
      </el-button>
      <el-button
        size="small"
        type="primary"
      >
        现场项目配置
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="handleCreateTasks"
      >
        任务下发
      </el-button>
    </div>
    <InspectionList />
    <CreateTasksDialog ref="createTask" />
  </div>
</template>

<script>
import EliTitle from '@components/_EliTitle'
import InspectionSearch from './components/InspectionSearch'
import InspectionList from './components/InspectionList'
import CreateTasksDialog from './components/CreateTasksDialog'

export default {
  name: 'InspectionManagement',
  components: {
    EliTitle,
    InspectionSearch,
    InspectionList,
    CreateTasksDialog
  },
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
     * 创建任务
     */
    handleCreateTasks () {
      this.$refs.createTask.handleShowDialog()
    }
  }
}
</script>

<style scoped lang="scss">
.inspection_container {
  padding: 30px;

  &_search {
    margin-top: 20px;
  }

  &_set {
    margin-bottom: 20px;
  }
}
</style>
