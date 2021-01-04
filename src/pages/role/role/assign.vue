<template>
  <div>
    <layout>
      <template slot="table">
        <el-row :gutter="24">
          <el-col :span="6">
            <ElTree
              ref="tree"
              style="width: 200px; height: 300px !important; padding: 10px; overflow: auto; background: #f5f7fa;"
              :data="officelist"
              :props="defaultProps"
              :expand-on-click-node="true"
              :render-after-expand="false"
              accordion
              highlight-current
              :node-key="defaultProps.id"
              @current-change="changed"
            />
            <!-- -->
          </el-col>
          <el-col :span="18">
            <el-transfer
              v-model="rightRole"
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入姓名查询"
              :data="leftRole"
            >
              <div
                slot-scope="{ option }"
                style="padding-right: 5px;"
              >
                {{
                  option.label
                }}
              </div>
            </el-transfer>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button @click="cancel">
              取消
            </el-button>
            <el-button
              type="primary"
              @click="submit"
            >
              添加已选人员
            </el-button>
          </el-col>
        </el-row>
      </template>
    </layout>
  </div>
</template>
<script>
import { office, readUser, assign } from '@api/table'
import layout from '@components/layout'
export default {
  components: {
    layout
  },
  data () {
    return {
      roleId: '',
      officelist: null,
      officeId: '',
      defaultProps: {
        children: 'childList',
        label: 'name',
        id: 'id'
      },
      leftRole: [],
      rightRole: []
    }
  },
  beforeRouteEnter (to, from, next) {
    office('sys_office_type').then((res) => {
      next((vm) => {
        vm.roleId = to.params.id
        vm.officelist = [res.item.officeTree]
        if (vm.officelist[0]) {
          vm.$nextTick(() => {
            vm.$refs.tree.setCurrentKey(vm.officelist[0].id)
            vm.changed()
          })
        }
      })
    })
  },
  computed: {
    params: function () {
      return {
        officeId: this.$refs.tree ? this.$refs.tree.getCurrentKey() : undefined
      }
    }
  },
  methods: {
    submit () {
      assign(this.roleId, this.rightRole).then((res) => {
        this.$router.go(-1)
      })
    },
    cancel () {
      this.$router.go(-1)
    },
    filterMethod (query, item) {
      if (item.label) {
        return item.label.indexOf(query) > -1
      }
      return true
    },
    // 用户操作的选中 node 改变回调
    changed () {
      readUser(this.params).then((res) => {
        const oldRole = this.leftRole.filter(
          (item) => this.rightRole.indexOf(item.key) !== -1
        )
        this.leftRole = oldRole
        res.page.list.forEach((item) => {
          if (this.leftRole.find((i) => i.key === item.id) === undefined) {
            this.leftRole.push({
              label: item.name,
              key: item.id
            })
          }
        })
      })
    }
  }
}
</script>
