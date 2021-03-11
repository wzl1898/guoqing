<template>
  <BasicInfoCard title="企业环境影响评价报告书">
    <IntroductionList
      :introduction-info="reportInfoLable"
      @click-item="handleClickResportItem"
    />
  </BasicInfoCard>
</template>

<script>
import BasicInfoCard from '../../common/BasicInfoCard'
import IntroductionList from '../../common/IntroductionList'

export default {
  name: 'InspectionReport',
  components: {
    BasicInfoCard,
    IntroductionList
  },
  data () {
    return {
      reportInfoLable: [
        {
          label: '评价因子与评价标准',
          value: 5
        },
        {
          label: '建设项目概况与工程分析',
          value: 5
        },
        {
          label: '程污染源分析',
          value: 5
        },
        {
          label: '环境风险评价',
          value: 5
        },
        {
          label: '污染防治措施',
          value: 5
        },
        {
          label: '清洁生产与循环经济分析',
          value: 5
        },
        {
          label: '产业政策、规划相符性及选址分析',
          value: 5
        },
        {
          label: '附件',
          value: 5
        }
      ]
    }
  },
  methods: {
    /**
     * @event: click-item
     * 点击项
     * @param {object} info 项的信息
     */
    handleClickResportItem (info) {
      this.$emit('click-inspec-item', info)
    }
  }
}
</script>
