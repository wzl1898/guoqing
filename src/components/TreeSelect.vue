<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      filterText: '', // 输入的过滤关键字
      visible: false, // 是否显示弹出框
      oResult: '', // resultText
      defaultProps: {
        children: 'childList',
        label: 'name'
      }
    }
  },
  computed: {
    innerValue () {
      return this.value !== '' ? this.value : undefined
    },
    currentNode () {
      return this.$refs.tree.getCurrentNode(this.innerValue)
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    innerValue () {
      this.$refs.tree.setCurrentKey(this.innerValue)
      this.update()
    },
    data () {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.innerValue)
        this.update()
      })
    }
  },
  methods: {
    clearTree () {
      this.$emit('input', '')
      this.visible = !this.visible
    },
    update () {
      if (this.currentNode) {
        this.oResult = this.currentNode[this.defaultProps.label]
        this.$emit('input', this.currentNode.id)
      } else {
        this.oResult = ''
      }
    },
    confirmTree () {
      if (this.currentNode) {
        this.update()
        this.visible = false
      } else {
        this.$message.warning('请选择一个节点!')
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<template>
  <el-popover
    v-model="visible"
    class="elPopover"
    placement="right"
    width="400"
    trigger="click"
  >
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-scrollbar class="elScrollbar">
      <el-tree
        ref="tree"
        class="elTree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :current-node-key="value"
        node-key="id"
        highlight-current
      />
    </el-scrollbar>

    <el-row>
      <el-col align="right">
        <el-link
          type="primary"
          class="control"
          @click="clearTree"
        >
          清除
        </el-link>
        <el-link
          type="primary"
          class="control"
          @click="visible = !visible"
        >
          取消
        </el-link>
        <el-button
          type="primary"
          class="control"
          @click="confirmTree"
        >
          确定
        </el-button>
      </el-col>
    </el-row>

    <el-input
      slot="reference"
      v-model="oResult"
      class="tInpit"
      readonly
      placeholder="未选择"
      @click="visible = !visible"
    />
  </el-popover>
</template>

<style lang="scss" scoped>
.control {
  margin: 0 10px;
}

.tInpit {
  width: 200px;
}

.elScrollbar {
  height: 500px;
}

.elScrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
