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
              <!-- <el-option label="所有数据" value="1"></el-option>
              <el-option label="所在公司及以下数据" value="2"></el-option> -->
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
                node-key="id"
                :props="defaultProps"
                style="background-color: transparent;"
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
import { addrole, office, getmenu, roledict } from '@api/table'
export default {
  components: {
    layout,
    TreeSelect
  },

  data () {
    return {
      menu: null,
      officelist: null,
      dataScopedata: [],
      ruleForm: {
        name: '',
        enname: '',
        officeId: '',
        isSys: true,
        useable: true,
        dataScope: '',
        roleType: '',
        menus: [],
        remarks: ''
      },

      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '长度在1-100',
            trigger: 'blur'
          }
        ],
        enname: [
          {
            required: true,

            message: '请输入英文名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '长度在1-100',
            trigger: 'blur'
          }
        ],
        dataScope: [
          {
            required: true,
            message: '数据范围不能为空',
            trigger: 'blur'
          }
        ],
        // menus: [
        //   {
        //     required: true,
        //     message: '角色授权不能为空',
        //     trigger: 'blur',
        //   },
        // ],
        roleType: [
          {
            required: true,
            message: '角色类型不能为空',
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
      },
      defaultProps: {
        id: 'id',
        children: 'childList',
        label: 'name'
      }
    }
  },
  computed: {
    params: function () {
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
        officeId: officeId,
        name: name,
        enname: enname,
        roleType: roleType,
        dataScope: dataScope,
        isSys: isSys,
        remarks: remarks,
        useable: useable,
        menus: menus
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const officeAPI = office('sys_office_type')
    const menuAPI = getmenu()
    // let roleAPI = getrole(to.params.id)
    const libAPI = roledict()
    Promise.all([officeAPI, menuAPI, libAPI]).then((values) => {
      const officeAPIresult = values[0]
      const menuAPIresult = values[1]
      const libAPIresult = values[2]
      next((vm) => {
        const officearray = []
        officearray.push(officeAPIresult.item.officeTree)
        vm.officelist = officearray
        vm.dataScopedata = libAPIresult.page.list
        const array = []
        array.push(menuAPIresult.item.menuTree)
        vm.menu = array
        // console.log(array)
      })
    })
    // console.log(this.dataScopedata);
  },
  methods: {
    handleCheckChange (data, checked, indeterminate) {
      this.menus =
        this.$refs.tree.getHalfCheckedKeys() +
        ',' +
        this.$refs.tree.getCheckedKeys()
      this.ruleForm.menus = this.menus.split(',')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          addrole(this.params).then((response) => {
            this.$refs[formName].resetFields()
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    }
  }
}
</script>
