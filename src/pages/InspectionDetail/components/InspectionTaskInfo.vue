<template>
  <BasicInfoCard
    title="巡查任务信息"
    show-state
  >
    <el-form
      inline
      class="task_form"
      label-width="80px"
    >
      <el-form-item
        v-for="(item, index) in taskInfoLabel"
        :key="item.label"
        :label="item.label"
        :class="['task_form_item',getIndexMoreTwoClass(index)]"
      >
        <span>{{ item.value }}</span>
      </el-form-item>
    </el-form>
  </BasicInfoCard>
</template>

<script>
import BasicInfoCard from '../../common/BasicInfoCard'

export default {
  name: 'InspectionTaskInfo',
  components: {
    BasicInfoCard
  },
  props: {
    taskInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      taskInfoLabel: [
        {
          label: '任务类型',
          value: '文本资料'
        },
        {
          label: '审查专家',
          value: '李四'
        },
        {
          label: '巡查人员',
          value: '詹杨洪'
        },
        {
          label: '发起时间',
          value: '2021-01-28'
        },
        {
          label: '完成时间',
          value: '2021-01-30'
        }
      ]
    }
  },
  methods: {
    getIndexMoreTwoClass (index) {
      return index > 2 ? 'more-width' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.task_form {
  &_item {
    width: calc(50% - 20px);

    &.more-width {
      width: calc(100% - 10%);
    }

    ::v-deep &.el-form-item {
      margin-bottom: 0;

      .el-form-item__label {
        font-size: 14px;
        color: $eli-prompt-color;
        text-align: left;
      }

      .el-form-item__content {
        color: $eli-text-color;
      }
    }
  }
}
</style>
