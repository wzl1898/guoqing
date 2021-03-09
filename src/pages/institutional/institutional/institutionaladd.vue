<script>
import treeFilter from '@components/TreeSelect'
import regionTreeFilter from '@components/RegionTreeSelect'

import { loadingModel } from '@utils/modelFunc'

import {
  addInstitutional,
  getInstitutional,
  getRegion,
  getInstitutionalType,
  getInstitutionalLevel
} from '@api/institutional'
export default {
  components: { treeFilter, regionTreeFilter },
  page: {
    title: '添加机构',
    meta: [{ name: 'Institutionaladd' }]
  },
  data () {
    return {
      /*
      ruleForm: {
        parentOrganizations: '', // 上级机构
        attributionArea: '', // 归属区域
        OrganizationName: '', // 机构名称
        OrganizationCoding: '', // 机构编码
        OrganizationType: '', // 机构类型
        OrganizationLevel: '', // 机构级别
        oswitch: false, // 是否可用
        principal: '', // 主要负责人
        vicePrincipal: '', // 副负责人
        address: '', // 联系地址
        postcode: '', // 邮政编码
        functionary: '', // 负责人
        phone: '', // 电话
        faxNO: '', // 传真
        email: '', // 邮箱
        describe: '', // 备注
        addDepartments: [], // 添加下级部门
      },
      */
      ruleForm: {
        address: '', // 联系地址
        areaId: '', // 归属区域
        code: '', // 机构编码
        deputyPerson: '', // 副负责人
        email: '', // 邮箱
        fax: '', // 传真
        grade: '', // 机构级别
        master: '', // 负责人
        name: '', // 机构名称
        parentId: '', // 上级机构
        phone: '', // 电话
        primaryPerson: '', // 主要负责人
        remarks: '', // 备注
        sort: null, // 添加下级部门
        type: '', // 机构类型
        useable: '', // 是否可用
        zipCode: '' // 邮政编码
      },
      rules: {
        code: [
          {
            pattern: /^[0-9]+$/,
            message: '机构编码只能是数字',
            trigger: ['blur', 'change']
          }
        ],
        address: [
          {
            // eslint-disable-next-line
            pattern: /([^\x00-\xff]|[A-Za-z0-9_])+/g,
            message: '请输入正确的地址信息',
            trigger: ['blur', 'change']
          }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            message: '请输入合法的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            pattern: /^[0-9]+$/,
            message: '请输入电话',
            trigger: ['blur', 'change']
          }
        ],
        fax: [
          {
            pattern: /^[0-9]+$/,
            message: '请输入传真号码',
            trigger: ['blur', 'change']
          }
        ],
        zipCode: [
          {
            pattern: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
            message: '请输入正确的邮编',
            trigger: ['blur', 'change']
          }
        ],
        parentId: [
          { required: true, message: '请选择归属区域', trigger: 'change' }
        ],
        areaId: [
          { required: true, message: '请选择归属区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '请选择机构类型', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择机构级别', trigger: 'change' }
        ],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      parentOrganization: [],
      AreaData: [],
      OrganizationTypeData: [],
      OrganizationLevelData: [],
      principalData: [
        {
          id: 10001,
          label: '实达迪美总公司',
          children: [
            {
              id: 11,
              label: '专门测试角色'
            },
            {
              id: 12,
              label: '漳州保管员'
            },
            {
              id: 13,
              label: '实达迪美分公司'
            },
            {
              id: 14,
              label: '技术部'
            },
            {
              id: 15,
              label: '研发部'
            }
          ]
        }
      ],
      vicePrincipalData: [
        {
          id: 1,
          label: '实达迪美总公司',
          children: [
            {
              id: 11,
              label: '专门测试角色'
            },
            {
              id: 10002,
              label: '漳州保管员'
            },
            {
              id: 13,
              label: '实达迪美分公司'
            },
            {
              id: 14,
              label: '技术部'
            },
            {
              id: 15,
              label: '研发部'
            }
          ]
        }
      ],
      addDepartmentsData: ['综合部', '开发部', '人力部']
    }
  },
  computed: {
    params: function () {
      const {
        address,
        areaId,
        code,
        deputyPerson,
        email,
        fax,
        grade,
        master,
        name,
        parentId,
        phone,
        primaryPerson,
        remarks,
        sort,
        type,
        useable,
        zipCode
      } = this.ruleForm
      return {
        address,
        areaId,
        code,
        deputyPerson,
        email,
        fax,
        grade,
        master,
        name,
        parentId,
        phone,
        primaryPerson,
        remarks,
        sort,
        type,
        useable,
        zipCode
      }
    }
  },
  mounted () {
    getInstitutional().then((data) => {
      var oldData = [data.item.officeTree]
      function setName (obj) {
        for (var i in obj) {
          obj[i].label = obj[i].name
          obj[i].children = obj[i].childList
          if (obj[i].childList) {
            setName(obj[i].childList)
          }
        }
        return obj
      }
      setName(oldData)
      this.parentOrganization = setName(oldData)
    })
    getRegion().then((data) => {
      var oldData = [data.item.areaTree]
      function setName (obj) {
        for (var i in obj) {
          obj[i].label = obj[i].name
          obj[i].children = obj[i].childList
          if (obj[i].childList) {
            setName(obj[i].childList)
          }
        }
        return obj
      }
      setName(oldData)
      this.AreaData = setName(oldData)
    })
    getInstitutionalType('office_type').then((data) => {
      this.OrganizationTypeData = data.page.list
    })
    getInstitutionalLevel('office_grade').then((data) => {
      this.OrganizationLevelData = data.page.list
    })
    this.ruleForm.parentId = this.$route.query.parentId
  },
  methods: {
    async submitForm (formName) {
      try {
        await this.$refs[formName].validate()
        const loading = loadingModel(this)
        const institutionalForm = { ...this.params }
        // TODO 属性值 为空时传null
        const keys = Object.keys(institutionalForm)
        keys.forEach((e) => {
          if (!institutionalForm[e]) {
            // delete userForm[e]
            institutionalForm[e] = null
          }
        })
        await addInstitutional(institutionalForm).finally(() => {
          loading.close()
        })
        this.$message.success('添加成功')
        this.$router.go(-1)
      } catch {}
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getParentOrganization (data) {
      this.ruleForm.parentOrganization = data
    },
    getAttributionArea (data) {
      this.ruleForm.attributionArea = data
    },
    getPrincipal (data) {
      this.ruleForm.principal = data
    },
    getVicePrincipal (data) {
      this.ruleForm.vicePrincipal = data
    }
  }
}
</script>

<template>
  <el-container>
    <el-header>
      <h3>添加机构</h3>
    </el-header>

    <el-main>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        :rules="rules"
        style="display: flex; flex-wrap: wrap;"
      >
        <el-form-item
          style="width: 50%;"
          label="上级机构"
          prop="parentId"
        >
          <tree-filter
            v-model="ruleForm.parentId"
            style="display: inline-block; width: 50%;"
            :data="parentOrganization"
          />
        </el-form-item>

        <el-form-item
          ref="treeFilter"
          style="width: 50%;"
          label="归属区域"
          prop="areaId"
        >
          <region-tree-filter
            v-model="ruleForm.areaId"
            :data="AreaData"
            style="display: inline-block; width: 50%;"
            @treeFilterEmit="getAttributionArea"
          />
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="机构名称"
          prop="name"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.name"
              :maxlength="100"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="机构编码"
          prop="code"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.code"
              :maxlength="100"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="机构类型"
          prop="type"
        >
          <el-select
            v-model="ruleForm.type"
            placeholder="请选择"
            style="width: 50%;"
          >
            <el-option
              v-for="(item, index) in OrganizationTypeData"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="机构级别"
          prop="grade"
        >
          <el-select
            v-model="ruleForm.grade"
            placeholder="请选择"
            style="width: 50%;"
          >
            <el-option
              v-for="(item, index) in OrganizationLevelData"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="是否可用"
          prop="useable"
        >
          <el-switch
            v-model="ruleForm.useable"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ccc"
          />
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="排序"
          prop="sort"
        >
          <el-col :span="12">
            <el-input
              v-model.number="ruleForm.sort"
              :maxlength="10"
              type="tel"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            />
          </el-col>
        </el-form-item>

        <!-- <el-form-item style="width: 50%" label="主负责人" prop="primaryPerson">
          <tree-filter
            v-model="ruleForm.primaryPerson"
            :data="principalData"
            @treeFilterEmit="getPrincipal"
          ></tree-filter>
        </el-form-item>

        <el-form-item style="width: 50%" label="副负责人" prop="deputyPerson">
          <tree-filter
            v-model="ruleForm.deputyPerson"
            :data="vicePrincipalData"
            @treeFilterEmit="getVicePrincipal"
          ></tree-filter>
        </el-form-item> -->

        <el-form-item
          style="width: 50%;"
          label="联系地址"
          prop="address"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.address"
              :maxlength="255"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="邮政编码"
          prop="zipCode"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.zipCode"
              :maxlength="100"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="负责人"
          prop="master"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.master"
              :maxlength="100"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="电话"
          prop="phone"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.phone"
              :maxlength="200"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="传真"
          prop="fax"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.fax"
              :maxlength="200"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="邮箱"
          prop="email"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.email"
              :maxlength="200"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="备注"
          prop="remarks"
        >
          <el-col :span="12">
            <el-input
              v-model="ruleForm.remarks"
              :maxlength="255"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-col>
        </el-form-item>

        <!-- <el-form-item  style="width: 50%" label="添加下级部门">
          <el-checkbox-group v-model="ruleForm.addDepartments">
            <el-checkbox
              v-for="(item, index) in addDepartmentsData"
              :key="index"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item style="width: 100%;">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >
            立即创建
          </el-button>
          <el-button @click="resetForm('ruleForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
