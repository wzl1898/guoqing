<template>
  <div class="guide_container">
    <div class="guide_container_left">
      <div class="guide_container_left_content">
        <div class="guide_container_left_content_title">
          数据源
        </div>
        <div class="guide_container_left_content_top">
          <div
            class="guide_container_left_content_top_item"
            @click="goPage('1')"
          >
            <CircleType :icon="'collection'" />
            <div>接口</div>
          </div>
          <div
            class="guide_container_left_content_top_item"
            @click="goPage('1')"
          >
            <CircleType :icon="'collection'" />
            <div>文件</div>
          </div>
          <div
            class="guide_container_left_content_top_item"
            @click="goPage('1')"
          >
            <CircleType :icon="'collection'" />
            <div>数据库</div>
          </div>
        </div>

        <div class="guide_container_left_content_bottom">
          <div
            class="guide_container_left_content_bottom_item"
            @click="goPage('2.1')"
          >
            <CircleType :icon="'programme'" />
            <div> 脱敏规则</div>
          </div>
          <div
            class="guide_container_left_content_bottom_item"
            @click="goPage('2.2')"
          >
            <CircleType :icon="'find'" />
            <div> 脱敏发现</div>
          </div>
        </div>
      </div>
    </div>
    <div class="guide_container_linebox">
      <div class="guide_container_linebox_connection" />
    </div>
    <div class="guide_container_original">
      <div class="guide_container_original_content">
        <div class="guide_container_original_content_title">
          原始库
        </div>

        <div
          class="guide_container_original_content_item"
          @click="goPage('3')"
        >
          <CircleType :icon="'origin'" />
          <div>转入原始库</div>
        </div>
        <div
          class="guide_container_original_content_item"
          @click="goPage('3')"
        >
          <CircleType :icon="'origin'" />
          <div>
            数据质检
          </div>
        </div>
        <div
          class="guide_container_original_content_item"
          @click="goPage('3')"
        >
          <CircleType :icon="'rule'" />
          <div>
            脱敏发现
          </div>
        </div>
      </div>
    </div>
    <div class="guide_container_originalline">
      <div class="guide_container_originalline_connection">
        <!-- <div class="triangle" /> -->
      </div>
    </div>
    <div class="guide_container_center">
      <div class="guide_container_center_content">
        <div class="guide_container_center_content_box">
          <div
            class="guide_container_center_content_box_item"
            @click="goPage('4.1')"
          >
            <CircleType :icon="'standard'" />
            <div>
              数据标准
            </div>
          </div>
          <div class="guide_container_center_content_box_line">
            <div class="guide_container_center_content_box_line_connection" />
          </div>
          <div
            class="guide_container_center_content_box_item"
            @click="goPage('4.2')"
          >
            <CircleType :icon="'project'" />
            <div>工程管理</div>
          </div>
        </div>
        <div class="guide_container_center_content_databaseline" />
      </div>
    </div>
    <div class="guide_container_database">
      <div class="guide_container_database_box">
        <div class="guide_container_database_box_leftsquare" />
        <div class="guide_container_database_box_rightsquare" />

        <div class="guide_container_database_box_top">
          <div class="guide_container_database_box_top_title">
            数仓管理
          </div>
          <div
            class="guide_container_database_box_top_item"
            @click="goPage('5.1')"
          >
            <CircleType :icon="'normal'" />
            <div>
              标准库
            </div>
          </div>
          <div
            class="guide_container_database_box_top_item"
            @click="goPage('5.2')"
          >
            <CircleType :icon="'theme'" />
            <div>主题库</div>
          </div>
        </div>

        <div class="guide_container_database_box_leftbottomline" />
        <div
          class="guide_container_database_box_bottom"
          @click="goPage('5.3')"
        >
          <CircleType :icon="'model'" />
          <div>模型发布</div>
        </div>
      </div>
    </div>
    <div class="guide_container_rightbottomline">
      <div class="guide_container_rightbottomline_line" />
    </div>
    <div class="guide_container_right">
      <div class="guide_container_right_content">
        <div
          class="guide_container_right_content_item"
          @click="goPage('6.1')"
        >
          <CircleType :icon="'api'" />
          <div>API管理</div>
        </div>
        <div
          class="guide_container_right_content_item right_bottom "
          @click="goPage('6.2')"
        >
          <CircleType :icon="'api'" />
          <div>API网关</div>
          <div class="guide_container_right_content_item_line" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CircleType from '@components/circle_type'
export default {
  components: {
    CircleType
  },
  data () {
    return {}
  },
  methods: {
    goPage (data) {
      switch (data) {
        case '1':
          this.$router.push('/linkagedata/data_source/')
          break
        case '2.1':
          this.$router.push('/linkagedata/desensitization/rules')
          break
        case '2.2':
          this.$router.push('/linkagedata/desensitization/schemes')
          break
        case '3':
          this.$router.push({
            path: '/linkagedata/bin_storage/library',
            query: {
              type: 'origin'
            }
          })
          break

        case '4.1':
          this.$router.push('/linkagedata/dataManagement/dataManagement')
          break

        case '4.2':
          this.$router.push('/projectmanagement/createproject')
          break
        case '5.1':
          this.$router.push({
            path: '/linkagedata/bin_storage/library',
            query: {
              type: 'normal'
            }
          })
          break
        case '5.2':
          this.$router.push({
            path: '/linkagedata/bin_storage/library',
            query: {
              type: 'theme'
            }
          })
          break
        case '5.3':
          this.$router.push('/apicontrol/apicontrollist/')
          break

        case '6.1':
          this.$router.push('/linkagedata/datawarehouse/api_management/')
          break
        case '6.2':
          this.$router.push('/gateway/interface_management_list')
          break

        default:
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.guide_container {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: #fff;
  background-image: url('../../assets/images/bg.jpg');
  background-position: center;
  background-size: cover;

  &_left {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &_content {
      height: circle-width(780);
      margin-left: circle-width(50);

      &_title {
        margin-bottom: -(circle-width(22));
        font-size: circle-width(14);
        text-align: center;
      }

      &_top,
      &_bottom {
        display: flex;
        align-content: center;
        justify-content: space-around;
        height: circle-width(200);
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;

        &_item {
          padding: circle-width(20);
          text-align: center;
        }
      }

      &_bottom {
        margin-top: circle-width(360);
      }
    }
  }

  &_linebox {
    display: flex;
    align-items: center;
    width: 5%;

    &_connection {
      width: 100%;
      height: 48%;
      border: dashed #78f0f6 circle-width(3);
      border-right: none;
      border-left: none;
    }
  }

  &_original {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 15%;

    &_content {
      height: circle-width(840);
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;

      &_title {
        padding-top: circle-width(10);
        padding-bottom: circle-width(10);
      }

      &_item {
        &_line {
          height: 100%;
        }

        display: flex;
        flex-direction: column;
        align-items: center;
        height: 33%;
      }
    }
  }

  &_originalline {
    display: flex;
    align-items: center;
    width: 5%;

    &_connection {
      width: 100%;
      height: 48%;
      border: none;
      border-top: dashed #78f0f6 circle-width(3);
    }
  }

  &_center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10%;

    &_content {
      display: flex;
      height: circle-width(745);

      &_box {
        height: 60%;

        &_line {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 20%;
        }

        &_line_connection {
          width: 0;
          height: 100%;
          border-left: dashed #78f0f6 circle-width(3);
        }

        &_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 40%;
          text-align: center;
        }
      }

      &_databaseline {
        width: 100%;
        height: 47%;
        border-bottom: dashed #78f0f6 circle-width(3);
      }
    }
  }

  &_database {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 15%;
    text-align: center;

    &_box {
      height: circle-width(840);

      &_leftsquare {
        position: absolute;
        top: circle-width(380);
        width: circle-width(105);
        height: circle-width(260);
        border: dashed #78f0f6 circle-width(3);
        border-right: none;
      }

      &_rightsquare {
        // position: absolute;
        // top: circle-width(380);
        // right: circle-width(500);
        // width: circle-width(177);
        // height: circle-width(260);
        // border: dashed #78f0f6 circle-width(3);
        // border-left: none;
      }

      &_leftbottomline {
        position: absolute;
        top: circle-width(615);
        width: circle-width(100);
        height: circle-width(300);
        border-bottom: dashed #78f0f6 circle-width(3);
        border-left: dashed #78f0f6 circle-width(3);
      }

      &_top {
        &_title {
          height: circle-width(30);
          line-height: circle-width(30);
        }

        width: 80%;
        height: 60%;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;

        &_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: calc(50% - 15px);
        }
      }

      &_bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 40%;
        height: 40%;
        margin: 0 auto;
      }
    }
  }

  &_right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 6%;
    text-align: center;

    &_content {
      height: circle-width(745);

      &_item {
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        height: 50%;

        &_line {
          position: absolute;
          left: 74%;
          width: circle-width(330);
          border-top: dashed #78f0f6 circle-width(3);
        }
      }
    }
  }

  &_rightbottomline {
    display: flex;
    align-items: center;
    width: 10%;
    height: 100%;

    &_line {
      width: 100%;
      height: 30%;
      margin-left: -13%;
      border-top: dashed #78f0f6 circle-width(3);
      // border-bottom: dashed #78f0f6 circle-width(3);
    }
  }
}

.right_bottom {
  padding-top: circle-width(70);
}

.triangle {
  width: 0;
  height: 0;
  border-color: transparent transparent transparent #78f0f6;
  border-style: solid;
  border-width: 10px 0 10px 10px;
}
</style>
