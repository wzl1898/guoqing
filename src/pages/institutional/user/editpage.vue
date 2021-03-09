<template>
  <div>
    <layout>
      <template slot="table">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="150px"
          style="display: flex; flex-wrap: wrap;"
        >
          <el-form-item
            style="width: 50%;"
            label="归属公司"
            prop="companylist"
          >
            <TreeSelect
              v-model="ruleForm.companyId"
              style="display: inline-block; width: 75%;"
              :data="companylist"
            />
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="归属部门"
            prop="officelist"
          >
            <TreeSelect
              v-model="ruleForm.officeId"
              style="display: inline-block; width: 75%;"
              :data="officelist"
            />
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="工号"
            prop="no"
          >
            <el-col :span="18">
              <el-input v-model="ruleForm.no" />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="姓名"
            prop="name"
          >
            <el-col :span="18">
              <el-input v-model="ruleForm.name" />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="登录名"
            prop="loginName"
          >
            <el-col :span="18">
              <el-input v-model="ruleForm.loginName" />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="密码"
            prop="password"
          >
            <el-col :span="18">
              <el-input
                v-model="ruleForm.password"
                show-password
              />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="确认密码"
            prop="confirmpwd"
          >
            <el-col :span="18">
              <el-input
                v-model="ruleForm.confirmpwd"
                show-password
              />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="邮箱"
            prop="email"
          >
            <el-col :span="18">
              <el-input v-model="ruleForm.email" />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="电话"
            prop="phone"
          >
            <el-col :span="18">
              <el-input v-model="ruleForm.phone" />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="手机"
            prop="mobile"
          >
            <el-col :span="18">
              <el-input v-model="ruleForm.mobile" />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="是否允许登陆"
            prop="loginFlag"
          >
            <el-switch
              v-model="ruleForm.loginFlag"
              inactive-value="0"
              active-value="1"
            />
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="用户类型"
            prop="userType"
          >
            <el-select
              v-model="ruleForm.userType"
              style="width: 50%;"
              placeholder="请选择活动区域"
            >
              <el-option
                label="普通用户"
                value="1"
              />
              <el-option
                label="部门经理"
                value="2"
              />
              <el-option
                label="系统管理"
                value="3"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            style="width: 100%;"
            label="用户角色"
            prop="roles"
          >
            <el-checkbox-group v-model="ruleForm.roles">
              <el-checkbox
                v-for="(item, index) in data"
                :key="index"
                :label="item.id"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="备注"
            prop="remarks "
          >
            <el-col :span="18">
              <el-input
                v-model="ruleForm.remarks"
                type="textarea"
              />
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="创建时间"
            prop="createDate"
          >
            <el-col :span="18">
              {{ ruleForm.createDate }}
            </el-col>
          </el-form-item>
          <el-form-item
            style="width: 50%;"
            label="最后登录"
            prop="loginIp"
          >
            <el-col :span="9">
              IP:<span v-if="ruleForm.loginIp">{{ ruleForm.loginIp }}</span>
            </el-col>
            <el-col :span="15">
              时间:
              <span v-if="ruleForm.loginDate">{{ ruleForm.loginDate }}</span>
            </el-col>
          </el-form-item>
          <el-form-item style="width: 100%;">
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
import { getUser, rolelist, editUser, office } from '@api/table'

import { loadingModel } from '@utils/modelFunc'

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
      companylist: null,
      data: null,
      ruleForm: {
        name: '',
        companyId: '',
        officeId: '',
        no: '',
        remarks: '',
        createDate: '',

        loginName: '',

        password: 'zxc234,./ZSE',
        confirmpwd: 'zxc234,./ZSE',
        email: '',
        phone: '',
        mobile: '',
        loginFlag: '1',
        roles: [],
        userType: ''
      },
      rules: {
        email: [
          {
            //  no-useless-escape
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            message: '请输入合法的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            pattern: /^[0-9]+$/,
            message: '请输入正确的电话',
            trigger: ['blur', 'change']
          }
        ],
        mobile: [
          {
            pattern: /^[0-9]+$/,
            message: '请输入合法的手机号',
            trigger: ['blur', 'change']
          }
        ],
        no: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        loginName: [
          { required: true, message: '请输入登陆名', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],

        userType: [
          {
            required: true,
            message: '请至少选择一个用户类型',
            trigger: 'change'
          }
        ],
        roles: [
          {
            required: true,
            message: '请选择至少一个角色',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    params: function () {
      const {
        roles,
        loginFlag,

        password,
        no,
        name,
        loginName,
        companyId,
        officeId,
        email,
        phone,
        mobile,
        remarks,
        userType
      } = this.ruleForm
      return {
        companyId: companyId,
        no: no,
        roles: roles,
        name: name,
        officeId: officeId,
        loginName: loginName,
        email: email,
        loginFlag: loginFlag,

        password: password,
        remarks: remarks,
        phone: phone,
        mobile: mobile,
        userType: userType
      }
    }
  },
  mounted () {
    this.obtainUserInfoListAndOther()
  },

  methods: {
    async submitForm (formName) {
      try {
        await this.$refs[formName].validate()
        if (this.ruleForm.password !== this.ruleForm.confirmpwd) {
          this.$message.warning('两次密码不一致，请确认')
          return
        }
        const loading = loadingModel(this)
        const userForm = { ...this.params }

        // TODO 属性值 为空时传null
        const keys = Object.keys(userForm)
        keys.forEach((e) => {
          if (!userForm[e]) {
            // delete userForm[e]
            userForm[e] = null
          }
        })
        if (userForm.password === 'zxc234,./ZSE') {
          userForm.password = null
        }
        await editUser(this.id, userForm).finally(() => {
          loading.close()
        })
        this.$message.success('修改成功')
        this.resetForm(formName)
      } catch {}
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    },

    async obtainUserInfoListAndOther () {
      const loading = loadingModel(this)
      try {
        const result = await Promise.all([
          getUser(this.$route.params.id),
          rolelist(),
          office(2),
          office(1)
        ])
        const userAPIresult = result[0]
        const rolelistAPIresult = result[1]
        const officeAPIresult = result[2]
        const companyAPIrelust = result[3]
        this.id = this.$route.params.id
        this.ruleForm = Object.assign(this.ruleForm, userAPIresult.item.user)

        const array = []
        array.push(officeAPIresult.item.officeTree)
        this.officelist = array
        const companyarray = []
        companyarray.push(companyAPIrelust.item.officeTree)
        this.companylist = companyarray

        this.ruleForm.companyId = userAPIresult.item.user.companyId
        this.ruleForm.officeId = userAPIresult.item.user.officeId

        this.ruleForm.roles = [] // 获取选中列表
        userAPIresult.item.user.roles.forEach((item) => {
          this.ruleForm.roles.push(item.id)
        })
        this.data = rolelistAPIresult.item.roles // 获取用户角色列表
      } finally {
        loading.close()
      }
    }
  }
}
</script>
