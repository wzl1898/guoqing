<template>
  <div class="detail_container">
    <div class="detail_container_header">
      <EliTitle
        title="巡查管理"
        detail="查看详情"
      />
      <div class="detail_container_header_submit">
        <!-- // TODO 如果该巡查单的状态为不合格， 按钮文字改为重新提交 -->
        <el-button
          type="primary"
          size="small"
        >
          提交
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleClickBack"
        >
          返回
        </el-button>
      </div>
    </div>
    <div class="detail_container_content">
      <div class="detail_container_info">
        <InspectionCompanyInfo class="detail_container_info_left" />
        <InspectionTaskInfo
          class="detail_container_info_right"
        />
      </div>
      <InspectionReport
        class="detail_container_item"
        @click-inspec-item="handleClickInspecItem"
      />
      <InspectionEmergencyPlan
        class="detail_container_item"
        @click-inspec-item="handleClickInspecItem"
      />
      <InspectionOtherInfo
        class="detail_container_item"
        @click-inspec-item="handleClickInspecItem"
      />
      <ReviewOpinon class="detail_container_item" />
      <CreateReviewOpinion class="detail_container_item" />
    </div>
    <InspectionUploadFile ref="uploadFile" />
  </div>
</template>

<script>
import EliTitle from '@components/_EliTitle'
import InspectionCompanyInfo from './components/InspectionCompanyInfo'
import InspectionTaskInfo from './components/InspectionTaskInfo'
import InspectionReport from './components/InspectionReport'
import InspectionEmergencyPlan from './components/InspectionEmergencyPlan'
import InspectionOtherInfo from './components/InspectionOtherInfo'
import ReviewOpinon from './components/ReviewOpinion'
import CreateReviewOpinion from './components/CreateReviewOpinion'
import InspectionUploadFile from './components/InspectionUploadFile'

export default {
  name: 'InspectionDetail',
  components: {
    EliTitle,
    InspectionCompanyInfo,
    InspectionTaskInfo,
    InspectionReport,
    InspectionEmergencyPlan,
    InspectionOtherInfo,
    ReviewOpinon,
    CreateReviewOpinion,
    InspectionUploadFile
  },
  methods: {
  /**
   * @event: click-inspec-item
   * 查看每项的照片或者上传图片
   * @param {object} info 每项的信息
   */
    handleClickInspecItem (info) {
      this.$refs.uploadFile.handleShowDialog(info, 'upload')
    },
    /**
     * @event: click
     * 返回上一级菜单
     */
    handleClickBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.detail_container {
  position: relative;
  height: calc(100vh - 60px);

  &_header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    background-color: $tint-color-background-header;
  }

  &_content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 92px 30px 30px;
    overflow: auto;
  }

  &_info {
    display: flex;

    &_left {
      width: calc(66.66% - 20px);
      margin-right: 20px;
    }

    &_right {
      width: 33.33%;
    }
  }

  &_item {
    margin-top: 30px;
  }
}
</style>
