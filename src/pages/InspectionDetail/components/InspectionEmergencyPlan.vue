<template>
  <BasicInfoCard title="突发环境事件应急预案">
    <IntroductionList
      :introduction-info="planInfoLabel"
      is-hover
      @click-item="handleClickResportItem"
    />
  </BasicInfoCard>
</template>

<script>
import BasicInfoCard from '../../common/BasicInfoCard'
import IntroductionList from '../../common/IntroductionList'

export default {
  name: 'InspectionEmergencyPlan',
  components: {
    BasicInfoCard,
    IntroductionList
  },
  data () {
    return {
      planInfoLabel: [
        {
          label: '基本情况',
          value: 5
        },
        {
          label: '环境风险源与环境风险评价',
          value: 5
        },
        {
          label: '应急培训和演练',
          value: 5
        },
        {
          label: '保障措施',
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
