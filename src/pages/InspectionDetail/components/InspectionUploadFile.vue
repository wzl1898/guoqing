<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
    title="上传图片"
    :visible="showDialog"
    width="900px"
    @close="handleCloseDialog"
  >
    <el-upload
      v-if="!isUpload"
      action="#"
      list-type="picture-card"
      :file-list="list"
      :limit="3"
      :http-request="handleSelectFile"
    >
      <i
        class="el-icon-plus"
      />
      <template #file="{file}">
        <div
          class="file_container"
          style="width: 100%; height: 100%;"
        >
          <el-image
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            fit="cover"
            :preview-src-list="list.map(item => item.url)"
            alt=""
          />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-delete"
              @click="handleClickRemoveImage(file)"
            >
              <i class="el-icon-delete" />
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <div
      v-else
      class="view_image"
    >
      <el-image
        v-for="image in list"
        :key="image.name"
        class="view_image_item"
        fit="cover"
        :src="image.url"
      />
    </div>
    <template
      v-if="isUpload"
      #footer
    >
      <el-button
        type="primary"
        @click="handleClickUpload"
      >
        上传
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'InspectionUploadFile',
  data () {
    return {
      showDialog: false,
      list: [{
        name: 'miao1',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }, {
        name: 'miao2',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }, {
        name: 'miao3',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }, {
        name: 'miao4',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }, {
        name: 'miao5',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }, {
        name: 'miao6',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }, {
        name: 'miao7',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }, {
        name: 'miao8',
        url: 'https://www.baoshuanglong.com/zb_users/upload/2020/03/202003241585013033482253.jpg'
      }],
      type: 'upload' // upload 上传图片 preview 查看图片
    }
  },
  computed: {
    isUpload () {
      return this.type === 'upload'
    }
  },
  methods: {
    /**
     * @event: close
     * 关闭dialog
     */
    handleCloseDialog () {
      this.showDialog = false
    },
    /**
     * @event: $refs - click
     * 显示dialog
     * @param {object} info 巡查子项的信息
     * @param {string} type 操作的类型 upload 上传图片 preview 查看图片
     */
    handleShowDialog (info, type) {
      this.showDialog = true
      this.type = type
    },
    /**
     * @event: click
     * 点击移除一张图片
     * @param {object} file 图片的信息
     */
    handleClickRemoveImage (file) {
      this.list = this.list.filter(item => item.name !== file.name)
    },
    handleSelectFile (file) {
      console.log(file)
    },
    /**
     * @event: click
     * 点击上传图片。 该功能只在上传图片时调用，查看图片无该功能
     */
    handleClickUpload () {
      console.log('upload')
    }
  }
}
</script>

<style lang="scss" scoped>
.file_container {
  ::v-deep .el-upload-list__item-actions {
    top: inherit;
    bottom: 0;
    height: 24%;
  }

  &:hover ::v-deep .el-upload-list__item-actions {
    opacity: 1;

    span {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}

.view_image {
  display: flex;
  flex-wrap: wrap;

  &_item {
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    border: 1px solid #c0ccda;
    border-radius: 6px;
  }
}

</style>
