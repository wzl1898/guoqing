<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="创建巡查任务"
    width="1000px"
    :visible="showDialog"
    center
    @close="handleCloseDialog"
  >
    <el-form
      :model="taskFormInfo"
      size="small"
      class="task_form"
      label-width="120px"
    >
      <el-form-item
        label="任务类型"
        prop="taskType"
      >
        <el-select
          v-model="taskFormInfo.taskType"
          class="task_form_item"
          placeholder="请选择任务类型"
          clearable
        >
          <el-option
            label="文本类型"
            value="1"
          />
          <el-option
            label="现场核查"
            value="2"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="污染区地址"
        prop="contaminatedArea"
      >
        <el-cascader
          v-model="taskFormInfo.contaminatedArea"
          placeholder="请选择污染区地址"
          class="task_form_item"
          :options="options"
          :props="props"
          collapse-tags
          clearable
        />
      </el-form-item>
      <el-form-item label="巡查人员">
        <el-radio-group v-model="taskFormInfo.patrolType">
          <el-radio label="1">
            巡查员
          </el-radio>
          <el-radio label="2">
            专家
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="巡查人"
        prop="patrolId"
      >
        <el-select
          v-model="taskFormInfo.patrolId"
          class="task_form_item"
          placeholder="请选择巡查人"
          clearable
        >
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item
        label="审查专家"
        prop="reviewId"
      >
        <el-select
          v-model="taskFormInfo.reviewId"
          class="task_form_item"
          placeholder="请选择审查专家"
          clearable
        >
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleCreateTasks"
        >
          创建任务
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateTasksDialog',
  data () {
    return {
      showDialog: false,
      taskFormInfo: {
        taskType: '', // 任务类型 1文本类型 2 现场核查
        contaminatedArea: '',
        patrolType: '1', // 1 巡查员 2 专家
        patrolId: '', // 巡查人id
        reviewId: '' // 专家id
      },
      props: { multiple: true },
      options: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏',
          children: [
            { value: 8, label: '南京' },
            { value: 9, label: '苏州' },
            { value: 10, label: '无锡' }
          ]
        }, {
          value: 12,
          label: '浙江',
          children: [
            { value: 13, label: '杭州' },
            { value: 14, label: '宁波' },
            { value: 15, label: '嘉兴' }
          ]
        }]
      }, {
        value: 17,
        label: '西北',
        children: [{
          value: 18,
          label: '陕西',
          children: [
            { value: 19, label: '西安' },
            { value: 20, label: '延安' }
          ]
        }, {
          value: 21,
          label: '新疆维吾尔族自治区',
          children: [
            { value: 22, label: '乌鲁木齐' },
            { value: 23, label: '克拉玛依' }
          ]
        }]
      }]
    }
  },
  methods: {
    /**
     * @event: $refs - click
     * 显示dialog
     */
    handleShowDialog () {
      this.showDialog = true
    },
    /**
     * @event: close
     * 关闭显示dialog
     */
    handleCloseDialog () {
      this.showDialog = false
    },
    /**
     * @event: click
     * 验证表单信息，根据表单信息创建任务
     */
    handleCreateTasks () {
      console.log(this.taskFormInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.task_form {
  width: 80%;
  margin: 0 auto;

  &_item {
    width: 80%;
  }
}
</style>
