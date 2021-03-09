export function loadingModel (vm) {
  return vm.$loading({
    lock: true,
    text: '正在请求中, 请稍后',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.6)',
    customClass: 'delete-loading'
  })
}

export function deletingModel (vm, message) {
  return vm.$confirm(message, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

/**
 * @tool
 * 设置算子别名到浏览器缓存中去
 */
export function setOperatorRenameToLocalStorage () {
  localStorage.removeItem('renameList')
  const nodeIdList = window.cli.elements()
  const nodeInfoList = nodeIdList.map(
    (id) => window.cli.element(id).businessObject
  )
  const renameList = nodeInfoList.map((node) => ({
    [node.id]: node.name
  }))
  localStorage.setItem('renameList', JSON.stringify(renameList))
}

/**
 * @class
 * 将搜索条件缓存到sessionStorage中
 */
export class CacheCondition {
  constructor (from) {
    this.from = from
    const _condition = sessionStorage.getItem('condition')
    this._condition = _condition
      ? {
        ...JSON.parse(_condition),
        from: this.from
      }
      : undefined
  }

  get condition () {
    return this._condition
  }

  set condition (val) {
    this._condition = {
      ...val,
      from: this.from
    }
  }

  removeSessionStorage () {
    sessionStorage.removeItem('condition')
  }

  setSessionStorage () {
    sessionStorage.setItem('condition', JSON.stringify(this.condition))
  }

  getSessionStorage () {
    const condition = sessionStorage.getItem('condition')
      ? JSON.parse(sessionStorage.getItem('condition'))
      : undefined
    return condition
  }

  getConditionInfo (from) {
    const condition = this.getSessionStorage()
    if (condition && condition.from === from) {
      this.removeSessionStorage()
      return condition
    }
    return undefined
  }
}

/**
 * 生成一个隐藏的按钮点击
 * @tool
 * @param {Blob} result 接口返回的blob格式的文件
 * @param {string} filename 文件的名称
 */
export function toolDownloadFileClick (result, filename) {
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'

  eleLink.href = URL.createObjectURL(result)
  // 自动触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 释放URL 对象
  window.URL.revokeObjectURL(eleLink.href)
  // 然后移除
  document.body.removeChild(eleLink)
}
