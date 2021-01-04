<template>
  <div>
    <layout>
      <template slot="header">
        <ElRow v-if="user">
          <el-col :span="3">
            角色名称: {{ user.name }}
          </el-col>
          <el-col :span="3">
            归属机构: {{ user.office.name }}
          </el-col>
          <el-col :span="3">
            英文名称: {{ user.enname }}
          </el-col>
          <el-col :span="3">
            角色类型: {{ user.roleType }}
          </el-col>
          <el-col :span="3">
            数据范围: {{ user.dataScopeDictionary }}
          </el-col>
        </ElRow>
        <ElRow :gutter="24">
          <el-col
            :span="24"
            :offset="20"
          >
            <ElButton
              type="primary"
              @click="assign(id)"
            >
              角色分配
            </ElButton>
          </el-col>
        </ElRow>
      </template>
      <template slot="table">
        <ElTable
          border
          :data="data"
          stripe
          size="mini"
        >
          <ElTableColumn
            v-for="(column, index) in columns"
            :key="index"
            :prop="column.value"
            header-align="left"
            :label="column.label"
          />

          <ElTableColumn
            align="center"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <ElButton
                size="mini"
                icon="el-icon-delete"
                circle
                type="danger"
                @click="delassign(scope.row)"
              />
            </template>
          </ElTableColumn>

          <!--footer组件-->
        </ElTable>
      </template>
    </layout>
  </div>
</template>
<script>
import { assignrole, getrole, userrole } from '@api/table'
import layout from '@components/layout'
export default {
  components: {
    layout
  },
  data () {
    return {
      id: '',
      data: null,
      user: null,
      columns: [
        {
          label: '归属公司',
          value: 'user.company'
        },
        {
          label: '归属部门',
          value: 'user.office'
        },
        {
          label: '登录名',
          value: 'user.loginName'
        },
        {
          label: '姓名',
          value: 'user.name'
        },
        {
          label: '电话',
          value: 'user.phone'
        },
        {
          label: '手机',
          value: 'user.mobile'
        }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    Promise.all([getrole(to.params.id), assignrole(to.params.id)]).then(
      (values) => {
        const getroleAPIresult = values[0]
        const assignroleAPIresult = values[1]
        next((vm) => {
          vm.user = getroleAPIresult.item.role
          vm.id = to.params.id
          vm.data = assignroleAPIresult.page.list
          vm.user.roleType = vm.transroletype(vm.user.roleType)
          // console.log(vm.user)
        })
      }
    )
  },
  methods: {
    transroletype (val) {
      if (val === 'assignment') {
        return '任务分配'
      } else if (val === 'security-role') {
        return '管理角色'
      } else {
        return '普通角色'
      }
    },
    fetchdata () {
      assignrole(this.id).then((Response) => {
        this.data = Response.page.list
      })
    },
    delassign (row) {
      userrole(row.userId, row.roleId).then((Response) => {
        this.fetchdata()
      })
    },
    assign (id) {
      this.$router.push({
        path: `/role/assign/${id}`
      })
    }
  }
}
</script>
