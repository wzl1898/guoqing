/**
 * 获取modules文件中的所有文件路径，包括子文件夹路径
 * @param 指定要读取的文件夹的路径
 * @param 指定是否读取子文件夹，true为是，false为否
 * @param 读取文件格式的正则
 * @return {
 * resolve,  -- resolve 是一个函数，它返回请求被解析后得到的模块 id。
 *  keys,  --  keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
 * id -- id 是上下文模块里面所包含的模块 id.
 * }
 */
const fileInfoList = require.context('./', true, /\/[\w\W_]+\/index\.js$/)

console.log(fileInfoList.id)

/**
 * @const
 * 定义一个用来保存模块的变量
 */
const modules = {}

/**
 * @let
 * 定义一个用来保存模块的名称和路径的变量
 * {
 *  key: 'xxx',
 *  path: 'xxx',
 *  modules: {}
 * }
 */
const moduleInfos = {}

/**
 * 将获取到的文件路径去掉'./'和'index.js'
 * 然后再通过'modules'截取成一个数组
 */
const fileKeys = fileInfoList.keys().map(key =>
  getFileName(key)
    .replace(/(^\/|\/$)/g, '')
    .split('/modules/')
)

/**
 * 将处理过后的文件路径数组，通过遍历，转换成需要的数据格式
 */
fileKeys.forEach((key, index) => {
  // 如果当前key长度只有1，说明是不是模块中的子模块
  if (key.length === 1) {
    const filename = formatFileName(key[0])
    moduleInfos[filename] = {
      key: filename, // 处理文件名 从 '/filename/' -> 'filename'  或者 '/file_name/' -> 'fileName'
      path: fileInfoList.keys()[index] // 当前文件名对应的路径
    }
  } else {
    // key的长度大于1，是子模块
    // 取出数组中的第一位，这个是子模块的父模块
    const objKey = key.shift()
    // 将截取后的数组通过reduce来处理
    key.reduce((pre, next) => {
      // 判断当前模块是否已经创建了modules对象，如果没有就创建一个
      if (!pre.modules) {
        pre.modules = {}
      }
      // 处理文件名 从 '/filename/' -> 'filename'  或者 '/file_name/' -> 'fileName'
      const filename = formatFileName(next)

      // 判断当前模块中的modules对象中是否已经有当前属性
      if (!pre.modules[filename]) {
        // 给当前模块添加一个新的属性
        pre.modules = {
          ...pre.modules,
          [filename]: {
            key: filename,
            path: fileInfoList.keys()[index]
          }
        }
      }
      // 将下一个模块返回回去
      return pre.modules[filename]
    }, moduleInfos[objKey]) // 将父模块的对象传入
  }
})

/**
 * 通过获取到的路径，解析出文件名所对应的字符串 /filename/  或者 /filename/modules/filename
 * @param {string} path 对应的路径
 */
function getFileName (path) {
  return path.replace(/index.js/, '').replace(/\./, '')
}

/**
 * 通过处理好的文件名和文件路径，创建store的modules
 * @param {Object} modulesInfo 定义好的仓库的模块存放变量
 * @param {Object} modulesPathInfo 定义好的文件名和文件路径的数据
 */
function createStoreModules (modulesInfo, modulesPathInfo) {
  // 获取路径数据，遍历
  Object.values(modulesPathInfo).forEach(value => {
    // 根据对应的key，设置对应的value
    modulesInfo[value.key] = {
      // 根据对应的path，获取文件的数据，因为是默认导出，所以需要.default获取
      ...fileInfoList(value.path).default,
      namespaced: true // 开启modules的命名空间，获取对应模块中的数据时，需要加上模块名称
    }
    // 判断有没有子模块
    if (value.modules) {
      // 需要先给仓库的模块定义一个空对象，不然会报错
      modulesInfo[value.key].modules = {}
      // 然后递归
      createStoreModules(
        modulesInfo[value.key].modules,
        modulesPathInfo[value.key].modules
      )
    }
    // 模块热加载，在开发过程中使用
    if (module.hot) {
      module.hot.accept(fileInfoList.keys(), () => {
        require('..').default.hotUpdate({
          modules: modulesInfo[value.key].modules
        })
      })
    }
  })
}

/**
 * 根据传入的文件名，将它转换成需要的格式 '/filename/' -> 'filename' 或者 '/file_name/' -> 'fileName'
 * @param {string} filename 文件的名称 '/filename/' 或者 '/file_name'
 */
function formatFileName (filename) {
  // 将'/file_name/' 转换成 '/fileName/'
  // filename = filename.replace(/(_)[\W\w]{1}/g, $ => {
  //   return $.substr(-1).toUpperCase()
  // })
  // 然后去掉 '/' 返回
  return filename.replace(/\//g, '')
}

// 执行创建store中的modules函数
createStoreModules(modules, moduleInfos)

// 将模块导出
export default modules
