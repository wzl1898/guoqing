<template>
  <BasicInfoCard title="专家审查意见">
    <div>
      <OpinionInfoItem />
    </div>
  </BasicInfoCard>
</template>

<script>
import BasicInfoCard from '../../common/BasicInfoCard'
import OpinionInfoItem from './OpinionInfoItem'

export default {
  name: 'ReviewOpinon',
  components: {
    BasicInfoCard,
    OpinionInfoItem
  }
}
</script>
