// 合并所有分类的工具数据
var toolsData = [];

// 加载图灵魔法分类
if (typeof turingTools !== 'undefined') {
  toolsData = toolsData.concat(turingTools);
}
if (typeof gamesTools !== 'undefined') {
  toolsData = toolsData.concat(gamesTools);
}
if (typeof sceneryTools !== 'undefined') {
  toolsData = toolsData.concat(sceneryTools);
}
if (typeof musicTools !== 'undefined') {
  toolsData = toolsData.concat(musicTools);
}
if (typeof toolsTools !== 'undefined') {
  toolsData = toolsData.concat(toolsTools);
}
// 未来可继续追加其他分类
// 未来添加其他分类，例如：
// if (typeof imageTools !== 'undefined') {
//   toolsData = toolsData.concat(imageTools);
// }
