<template>
  <div>
    <layout>
      <template slot="table">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item
            label="归属机构"
            prop="officeId"
          >
            <TreeSelect
              v-model="ruleForm.officeId"
              :data="officelist"
            />
          </el-form-item>
          <el-form-item
            label="角色名称"
            prop="name"
          >
            <el-col :span="6">
              <el-input v-model="ruleForm.name" />
            </el-col>
          </el-form-item>
          <el-form-item
            label="英文名称"
            prop="enname"
          >
            <el-col :span="6">
              <el-input v-model="ruleForm.enname" />
            </el-col>
          </el-form-item>
          <el-form-item
            label="角色类型"
            prop="roleType"
          >
            <el-select
              v-model="ruleForm.roleType"
              placeholder="请选择活动区域"
            >
              <el-option
                label="任务分配"
                value="assignment"
              />
              <el-option
                label="管理角色"
                value="security-role"
              />
              <el-option
                label="普通角色"
                value="normal"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="是否为系统数据"
            prop="issys"
          >
            <el-switch
              v-model="ruleForm.isSys"
              inactive-value="0"
              active-value="1"
            />
          </el-form-item>
          <el-form-item
            label="是否可用"
            prop="useable"
          >
            <el-switch
              v-model="ruleForm.useable"
              inactive-value="0"
              active-value="1"
            />
          </el-form-item>
          <el-form-item
            label="数据范围"
            prop="dataScope"
          >
            <el-select
              v-model="ruleForm.dataScope"
              placeholder="请选择活动区域"
            >
              <el-option
                v-for="item in dataScopedata"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="角色授权"
            prop="menus"
          >
            <el-col :span="6">
              <el-tree
                ref="tree"
                :data="menu"
                show-checkbox
                leaf-only
                node-key="id"
                :props="defaultProps"
                style="background-color: transparent;"
                :default-checked-keys="checkKeys"
                @check-change="handleCheckChange"
              />
            </el-col>
          </el-form-item>
          <el-form-item
            label="备注"
            prop="remarks"
          >
            <el-col :span="6">
              <el-input
                v-model="ruleForm.remarks"
                type="textarea"
              />
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button @click="resetForm('ruleForm')">
              取消
            </el-button>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </layout>
  </div>
</template>
<script>
import layout from '@components/layout'
import TreeSelect from '@components/TreeSelect'
import { getrole, updaterole, office, getmenu, roledict } from '@api/table'
export default {
  components: {
    layout,
    TreeSelect
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      officelist: null,
      dataScopedata: [],
      menu: [],
      name: '',
      roles: [],
      checkKeys: [],
      ruleForm: {
        name: '',
        enname: '',
        id: '',
        officeId: '',
        value: '',
        isSys: true,
        useable: true,
        dataScope: '',
        roleType: '',
        remarks: '',
        menus: []
      },
      defaultProps: {
        id: 'id',
        children: 'childList',
        label: 'name'
      },
      rules: {
        name: [
          {
            required: true,
            min: 2,
            max: 10,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        enname: [
          {
            required: true,
            min: 1,
            max: 10,
            message: '请输入英文名称',
            trigger: 'blur'
          }
        ],

        dataScope: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        roleType: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        officeId: [
          {
            required: true,
            message: '请选择机构',
            trigger: 'change'
          }
        ]
        // menus: [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     message: '请选择角色授权',
        //   },
        // ],
        // TODO tree组件的表单校验暂无法实现
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const roleAPI = getrole(to.params.id)
    const officeAPI = office('sys_office_type')
    const menuAPI = getmenu()
    const libAPI = roledict()
    Promise.all([officeAPI, menuAPI, roleAPI, libAPI]).then((values) => {
      const officeAPIresult = values[0]
      const menuAPIresult = values[1]
      const roleAPIresult = values[2]
      const libAPIresult = values[3]
      next((vm) => {
        vm.ruleForm = roleAPIresult.item.role
        vm.dataScopedata = libAPIresult.page.list
        vm.name = roleAPIresult.item.role.name
        const officearray = []
        officearray.push(officeAPIresult.item.officeTree)
        vm.officelist = officearray
        const array = []
        array.push(menuAPIresult.item.menuTree)
        vm.menu = array

        const tempListKeys = []
        // 获取菜单ID
        const tempArray = roleAPIresult.item.role.menuList
        for (let element = 0; element < tempArray.length; element++) {
          if (tempArray[element] === null) {
            continue
          } else {
            tempListKeys.push(tempArray[element].id)
          }
        }

        vm.checkKeys = tempListKeys
        vm.getArray(vm.menu)
      })
    })
  },

  computed: {
    params () {
      const {
        officeId,
        roleType,
        enname,
        dataScope,
        isSys,
        remarks,
        name,
        useable,
        menus
      } = this.ruleForm
      return {
        enname: enname,
        roleType: roleType,
        dataScope: dataScope,
        isSys: isSys,
        remarks: remarks,
        name: name,
        officeId: officeId,
        useable: useable,
        menus: menus
      }
    }
  },
  methods: {
    // 去除父节点信息
    getArray (data) {
      for (var i in data) {
        if (data[i].childList.length > 0) {
          if (this.checkKeys.indexOf(data[i].id) > -1) {
            const keysIndex = this.checkKeys.indexOf(data[i].id)
            this.checkKeys.splice(keysIndex, 1)
          }
          this.getArray(data[i].childList)
        }
      }
    },
    handleCheckChange (data, checked, indeterminate) {
      this.$refs.ruleForm.validateField('menus')
      this.ruleForm.menus =
        this.$refs.tree.getHalfCheckedKeys() +
        ',' +
        this.$refs.tree.getCheckedKeys()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          if (
            typeof this.ruleForm.menus === 'undefined' ||
            (Array.isArray(this.ruleForm.menus) && !this.ruleForm.menus.length) // TODO 校验是否未空以及是否未空数组
          ) {
            // this.$message.error('角色未授权')
            this.$refs.ruleForm.validateField('menus')
            this.ruleForm.menus =
              this.$refs.tree.getHalfCheckedKeys() +
              ',' +
              this.$refs.tree.getCheckedKeys()
          }
          // console.log(this.ruleForm.menus)

          if (this.ruleForm.menus === ',') {
            this.$message.error('角色未授权')
            return
          }
          this.params.menus = this.params.menus.split(',')
          updaterole(this.ruleForm.id, this.params).then((Response) => {
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$router.go(-1)
      this.$refs[formName].resetFields()
    }
  }
}
</script>
