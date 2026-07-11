// 合并所有分类的工具数据
var toolsData = [];

// 加载图灵魔法分类
if (typeof turingTools !== 'undefined') {
  toolsData = toolsData.concat(turingTools);
}

// 未来添加其他分类，例如：
// if (typeof imageTools !== 'undefined') {
//   toolsData = toolsData.concat(imageTools);
// }
