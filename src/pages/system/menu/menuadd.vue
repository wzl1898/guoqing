<script>
import treeFilter from '@components/TreeSelect'
import { createMenu, getMenuTreeTable } from '@api/system'

export default {
  components: { treeFilter },
  data () {
    return {
      // TODO: 等待后台新增一个用于接收 "vue路由" 的字段
      ruleForm: {
        href: '', // 链接
        icon: '', // 图标
        isShow: 0, // 是否在菜单中显示
        name: '', // 名称
        parentId: '', // 父级菜单
        permission: '', // 权限标识
        remarks: '', // 备注
        sort: null, // 排序
        target: '', // 目标
        vueRoute: '', // vue路由名称
        vueRouteAlias: '' // vue路由别名
      },
      rules: {
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      parentOrganization: [
        /*
        {
          id: 1,
          label: '实达迪美总公司',
          children: [
            {
              id: 11,
              label: '实达迪美分公司',
            },
            {
              id: 12,
              label: '技术部',
            },
            {
              id: 13,
              label: '研发部',
            },
          ],
        },
        */
      ]
    }
  },
  computed: {
    params: function () {
      const {
        href,
        icon,
        isShow,
        name,
        parentId,
        permission,
        remarks,
        sort,
        target,
        vueRoute,
        vueRouteAlias
      } = this.ruleForm
      return {
        href: href,
        icon: icon,
        isShow: isShow,
        name: name,
        parentId: parentId,
        permission: permission,
        remarks: remarks,
        sort: sort,
        target: target,
        vueRoute: vueRoute,
        vueRouteAlias: vueRouteAlias
      }
    }
  },
  mounted () {
    getMenuTreeTable().then((data) => {
      var oldData = [data.item.menuTree]
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
    this.ruleForm.parentId = this.$route.query.parentId
  },
  methods: {
    open () {},
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$alert('新添加的菜单将在下一次成功登陆时生效!', '注意:', {
            confirmButtonText: '知道了',
            callback: (action) => {
              this.$message({
                type: 'info',
                message: '菜单添加成功'
              })
              createMenu(this.params).then((Response) => {})
              this.$router.go(-1)
            }
          })
        } else {
          this.$message.error('表单信息填写有误!')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getParentOrganization (data) {
      this.ruleForm.parentOrganization = data
    }
  }
}
</script>

<template>
  <el-container>
    <el-header>
      <h3>添加菜单</h3>
    </el-header>

    <el-main>
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="上级菜单"
          prop="parentId"
        >
          <tree-filter
            v-model="ruleForm.parentId"
            :data="parentOrganization"
          />
        </el-form-item>

        <el-form-item
          label="名称"
          prop="name"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.name"
              :maxlength="100"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="链接"
          prop="href"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.href"
              :maxlength="2000"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="vue路由"
          prop="vueRoute"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.vueRoute"
              :maxlength="2000"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="vue路由别名"
          prop="vueRouteAlias"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.vueRouteAlias"
              :maxlength="2000"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="目标"
          prop="target"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.target"
              :maxlength="255"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="图标"
          prop="icon"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.icon"
              :maxlength="100"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="排序"
          prop="sort"
        >
          <el-col :span="5">
            <el-input
              v-model.number="ruleForm.sort"
              type="tel"
              :maxlength="10"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="可见"
          prop="isShow"
        >
          <el-switch
            v-model="ruleForm.isShow"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>

        <el-form-item
          label="权限标识"
          prop="permission"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.permission"
              :maxlength="200"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="备注"
          prop="remarks"
        >
          <el-col :span="5">
            <el-input
              v-model="ruleForm.remarks"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :maxlength="255"
            />
          </el-col>
        </el-form-item>

        <el-form-item>
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
