<script>
import treeFilter from '@components/TreeSelect'
import { updataMenu, getMenuTreeTable, getMenuInfo } from '@api/system'
export default {
  components: { treeFilter },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
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
      isTwo: false, // 判断是否为二级菜单
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
      parentOrganization: []
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
    this.ruleForm.id = this.$route.params.id
    this.isTwo = this.$route.query.isTwo
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

    getMenuInfo(this.ruleForm.id).then((data) => {
      this.ruleForm = data.item.menu
    })
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          // this.$alert('本次修改的菜单将在下一次成功登陆时生效!', '注意:', {
          //   confirmButtonText: '知道了',
          //   callback: (action) => {
          //     this.$message({
          //       type: 'info',
          //       message: `菜单修改成功`,
          //     })
          //     updataMenu(this.ruleForm.id, this.params).then((Response) => {
          //       this.$router.go(-1)
          //     })
          //   },
          // })

          updataMenu(this.ruleForm.id, this.params).then((Response) => {
            this.$store.dispatch('stateRouting/SetRouting').then(() => {
              // this.$router.go(-1)
              // 登录成功添加路由
              // TODO: FALITURE CASE
              // this.$router.push(
              //   this.$route.query.redirectFrom || { name: 'home' }
              // )
              this.$message({
                type: 'success',
                message: '菜单修改成功'
              })
              location.reload()
            })
          })
        }
      })
    },
    resetForm () {
      getMenuInfo(this.ruleForm.id).then((data) => {
        this.ruleForm = data.item.menu
      })
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
      <h3>修改菜单</h3>
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
          v-if="isTwo"
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
            保存
          </el-button>
          <el-button @click="resetForm">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
