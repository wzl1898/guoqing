<template>
  <BasicInfoCard title="祥恒（莆田）包装有限公司">
    <el-form
      inline
      class="company_form"
      label-width="140px"
    >
      <el-form-item
        v-for="item in companyInfoLabel"
        :key="item.label"
        :label="item.label"
        class="company_form_item"
      >
        <span>{{ item.value }}</span>
      </el-form-item>
    </el-form>
  </BasicInfoCard>
</template>

<script>
import BasicInfoCard from '../../common/BasicInfoCard'

export default {
  name: 'InspectionCompanyInfo',
  components: {
    BasicInfoCard
  },
  props: {
    companyInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      companyInfoLabel: [
        {
          label: '统一社会信用代码',
          value: '91350304563395712X'
        },
        {
          label: '行业类别',
          value: '制作业'
        },
        {
          label: '联系人',
          value: '詹杨洪'
        },
        {
          label: '联系电话',
          value: '18396028696'
        },
        {
          label: '企业地址',
          value: '莆田市XXX区XX街XX路XX号'
        },
        {
          label: '企业ID',
          value: '100021'
        },
        {
          label: '污染区地址',
          value: '莆田市XXX区XX街XX路XX号'
        },
        {
          label: '污染ID',
          value: '123874'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.company_form {
  &_item {
    width: calc(50% - 20px);

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
