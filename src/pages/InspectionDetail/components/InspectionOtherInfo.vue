<template>
  <BasicInfoCard title="其他与环境风险相关的资料">
    <IntroductionList
      :introduction-info="otherInfoLabel"
      @click-item="handleClickResportItem"
    />
  </BasicInfoCard>
</template>

<script>
import BasicInfoCard from '../../common/BasicInfoCard'
import IntroductionList from '../../common/IntroductionList'

export default {
  name: 'InspectionOtherInfo',
  components: {
    BasicInfoCard,
    IntroductionList
  },
  data () {
    return {
      otherInfoLabel: [
        {
          label: '监测报告',
          value: 5
        },
        {
          label: '验收报告',
          value: 5
        },
        {
          label: '清洁生产审核报告',
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
