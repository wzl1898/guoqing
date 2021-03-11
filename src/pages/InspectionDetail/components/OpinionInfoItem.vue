<template>
  <div class="opinion_container">
    <p class="opinion_container_text">
      <span class="opinion_container_text_label">不合格原因：</span>
      <span class="opinion_container_text_content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, laborum odio. Nesciunt animi eos aliquid sint dolorum repellat, architecto, reprehenderit quae rerum alias minus consectetur optio rem quidem sit aspernatur?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate excepturi aspernatur placeat quod culpa at possimus ullam? Aut velit minus ipsum! Odio, expedita! Rem assumenda eveniet possimus ratione delectus error.
      </span>
    </p>
    <p class="opinion_container_text">
      <span class="opinion_container_text_label rectify">整改意见：</span>
      <span class="opinion_container_text_content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In cum deserunt ipsam velit vel tempore! Ducimus maxime iusto officia, qui, dolor iste in quaerat nisi, nihil sequi mollitia aut eveniet. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptatem ex reiciendis temporibus fugit at, eos, obcaecati, unde iusto ab facere ea eaque autem quaerat quidem libero sunt dicta officiis?
      </span>
    </p>
    <p class="opinion_container_text">
      <span class="opinion_container_text_label rectify">企业反馈：</span>
      <span class="opinion_container_text_content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In cum deserunt ipsam velit vel tempore! Ducimus maxime iusto officia, qui, dolor iste in quaerat nisi, nihil sequi mollitia aut eveniet. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptatem ex reiciendis temporibus fugit at, eos, obcaecati, unde iusto ab facere ea eaque autem quaerat quidem libero sunt dicta officiis?
      </span>
    </p>
    <div class="opinion_container_image">
      <el-image
        v-for="i in 20"
        :key="i"
        fit="cover"
        class="opinion_container_image_item"
      >
        <i
          slot="error"
          class="el-icon-picture-outline"
        />
      </el-image>
    </div>
    <div class="opinion_container_text">
      <span class="opinion_container_text_label rectify">再次巡查：</span>
      <el-upload
        v-if="false"
        class="opinion_container_text_upload"
        action="#"
        :file-list="list"
        list-type="picture-card"
        :http-request="handleSelectFile"
        :limit="3"
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
              :preview-src-list="list.map(item => item.url)"
              fit="cover"
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
        class="opinion_container_image"
        style="padding-left: 0; font-size: 16px;"
      >
        <el-image
          v-for="i in 20"
          :key="i"
          fit="cover"
          class="opinion_container_image_item"
        >
          <i
            slot="error"
            class="el-icon-picture-outline"
          />
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OpinionInfoItem',
  data () {
    return {
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
      }]
    }
  },
  methods: {
    handleSelectFile (file) {
      console.log(file)
    },
    /**
     * @event: click
     * 点击移除一张图片
     * @param {object} file 图片的信息
     */
    handleClickRemoveImage (file) {
      this.list = this.list.filter(item => item.name !== file.name)
    }
  }

}
</script>

<style scoped lang="scss">
.opinion_container {
  padding: 20px 40px;
  background-color: #f6f9fc;
  border-radius: 8px;

  &_text {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    font-size: 12px;
    line-height: 1.4;
    color: $eli-title-color;

    &_label {
      min-width: 72px;

      &.rectify {
        min-width: 60px;
      }
    }

    &_upload {
      ::v-deep .el-upload--picture-card {
        width: 80px;
        height: 80px;
        line-height: 90px;
      }

      ::v-deep .el-upload-list--picture-card .el-upload-list__item {
        width: 80px;
        height: 80px;
      }
    }

    .file_container {
      ::v-deep .el-upload-list__item-actions {
        top: inherit;
        bottom: 0;
        height: 40%;
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
  }

  &_image {
    padding-left: 60px;
    color: $eli-title-color;

    &_item {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      line-height: 80px;
      text-align: center;
    }
  }
}
</style>
