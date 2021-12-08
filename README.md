![Alt](https://repobeats.axiom.co/api/embed/878c4ca3e857f1fa8a5221dea9e1656d8e88a173.svg "Repobeats analytics image")

# 原神圣遗物词条计算器

- 一个用来自学 React 的技术 Demo
- 纯前端，可以本地部署运行
- 不排除后面需要学习 react 网络请求，需要加入异步接口等
- 争取元旦之前做完（咕咕咕
- pr 请提到 dev 分支

## 主要功能

- 根据输入准确计算出圣遗物词条数（预计工期 28md
- 下词条圣遗物收益计算与推荐（预计工期 7md
- 本地缓存、计算数据导入导出（预计工期 7md
- 相同技能函数下的不同情况对比（预计工期 21md
- 圣遗物导入导出，限制情况下的推荐配队（饼

## 整体流程

- 技能区 只需要考虑是否有 buff 的技能 配置伤害类型 攻击类型
- 或者低代码编写反应率函数，并且可以保存函数复用
- 选择你圣遗物的主副词条，圣遗物套装效果在下面 buff 区配
- 计算理论最大和期望满词条收益，计算当前圣遗物副词条收益，即可计算出准确的当前词条数量离毕业还有多远
- 显示下一条词条提升率，各个圣遗物的词条数，毕业难度

## 工具链

具体版本请查看 package.json

### 主要

Yarn + Vite + Typescript + React Hooks + Mobx + Antd + Eslint + Prettier

### 插件

styled-components + react-router-dom + react-helmet-async

## 随笔

- 211118 做数据结构太痛苦了……
- 211208 停工至面试期结束

## 目前学习情况

- 熟悉上面一系列的工具链的作用与其具体的应用形式
- get 前端整体架构铺设经验
- 正在熟悉各种 hook

## 感想

- Yarn/Vite 爽
- Antd 好看又好用
- Typescript 熟悉ing
- Mobx 一知半解
- React Hooks 一知半解
- Eslint/Prettier 不会还有人没用吧

## 部署

```
// 安装依赖
yarn
// 本代测试
yarn run dev
```
