/**
 * 适配不同平台tag差异 转换
 */
export function createTransfromTag(source, target) {
  if (source === target) {
    return defaultTransform
  }

  if (target === 'aliapp') {
    return transfromToAliapp
  }

  if (target === 'swan') {    
    return transformToBaidu
  }

  return defaultTransform
}

function defaultTransform(node) {
  return node;
}

/**
 * 转换成百度对应的tag
 * @see https://smartprogram.baidu.com/docs/develop/framework/sjs_start/
 * 百度不再维护 filter 转而 sjs
 */
function transformToBaidu(node) {
  // <wxs> => <import-sjs>
  if (node.tag === 'wxs') {
    node.tag = 'import-sjs'
  }
  return node
}

/**
 * 转换成支付宝对应的tag
 */
function transfromToAliapp(node) {
  // <wxs> => <import-sjs>
  if (node.tag === 'wxs') {
    node.tag = 'import-sjs'
    if (node.attrs.module) {
      node.attrs.name = node.attrs.module;
      delete node.attrs.module;
    }
    if (node.attrs.src) {
      node.attrs.from = node.attrs.src;
      delete node.attrs.src;
    }
  }
  return node
}
