# 说明

项目为

## 关于技术使用

项目包管理使用**NPM**版本为**v8.5.0**，**Node.js**版本为**v16.14.1**，，请尽可能保持版本一致或大版本差距不会过大

项目技术使用：Vue 3 | Element Plus | Vue use | Vue Router | Pinia | Axios | Echarts

项目构建使用**Vite**，在运行项目前请先安装Vite，官方文档[点击此处](https://cn.vitejs.dev/guide/)

使用 NPM:

`npm create vite@latest`

在项目目录下

`npm install`

运行项目：

`npm run dev`

## 关于api

使用前请在 `src/utils`修改 `http.js`中的**baseURL**地址

项目的请求均在src/apis目录下，使用axios发送，有问题可在其修改

做题模块api	exercise.js

用户模块api	user.js

> 注意：响应需要做跨域处理！

## 关于测试

如果需要进入到答题模块中进行测试

请在目录 `src/router/index.js`中注释掉 `beforeEnter`中的配置代码

## 登录模块

### 用户登录（POST）

#### 请求参数

```json
{
	"username":"用户名",
	"password":"密码"
}
```

#### 响应信息

```json
{
    "code": "状态码",
    "msg": "success",
    "isSuccess": true, //是否登录成功
    "result": {		//用户信息
        "userID": "用户ID",
        "username": "用户名"
    }
}
```

## 题目模块

### 获取题目（GET）

#### 请求参数（是否使用restful风格待定）

`/exercise?subject=科目&userID=用户id`

#### 响应信息

```json
{
	"code": "1",
	"msg": "success",
	"result": {
		"exerciseID": "001",
		"exerciseList": [
			{
				"topicID": "题目编号",
				"topicType": 0, //0为选择题，1为填空题
				"topicDesc": "题目描述",
				"topicImg": "图片地址"
			},
			{
				"topicID": "002",
				"topicType": 0,
				"topicDesc": "第二题",
				"topicImg": ""
			},
			{
				"topicID": "003",
				"topicType": 1,
				"topicDesc": "第三题",
				"topicImg": "https://pic1.zhimg.com/v2-92392172531ba8e252e3f9afaa4232d2_1440w.jpg?source=172ae18b"
			},
		]
	}
}
```

### 发送答题信息（POST）

#### 请求体

```json
{
    "exerciseID": "本次答题的试卷ID",
    "answers": [
        {
            "topicID": "题目ID",
            "isComplate": ture, //布尔值，题目是否回答
            "optition": "选择题选项", //若为客观题则无此项
            "text": [	//客观题答案，若为选择题则无此项
                "步骤1"，
                "步骤2"，
                "步骤3"，
                "步骤4"，
            ]
        },
        {
            "topicID": "002",
            "isComplate": ture,
            "optition": "",
            "text": [	//客观题答案
                ""，
                ""，
                ""，
                ""，
            ]
        }
    ]
}
```

#### 响应信息

无

## 分析模块

### 获取答题历史列表（GET）

#### 请求参数

`/answerHistoryList?userID=用户ID`

#### 响应信息

```json
{
	"code": "200",
	"msg": "获取成功",
	"result": {
		historyList:[
			{
				exerciseID:'001', //测试ID
				subject:'数学', //科目
				times:'1', //次数
				date:'2023-6-20' //时间
			},
			{
				exerciseID:'002', //测试ID
				subject:'数学',
				times:'2', //次数
				date:'2023-6-20' //时间
			},
			{
				exerciseID:'003', //测试ID
				subject:'物理',
				times:'1', //次数
				date:'2023-6-20' //时间
			}
		]
	}
}
```

### 获取答题历史（GET）

#### 请求参数

`/answerHistory?exerciseID=002`

#### 响应信息

```json
{
	"code": "1",
	"msg": "获取成功",
	"result": {
		"exerciseID": "001",
		"exerciseList": [
			{
				"topicID": "001",
				"topicType": 0,
				"topicDesc": "第一题",
				"topicImg": "https://pic1.zhimg.com/v2-92392172531ba8e252e3f9afaa4232d2_1440w.jpg?source=172ae18b",
				"isRight":false,
				"userAnswer":"用户的答案",
				"rightAnswer":"标准答案"
			},
			{
				"topicID": "002",
				"topicType": 0,
				"topicDesc": "第二题",
				"topicImg": "https://pic1.zhimg.com/v2-92392172531ba8e252e3f9afaa4232d2_1440w.jpg?source=172ae18b",
				"isRight":true,
				"userAnswer":"用户的答案",
				"rightAnswer":"标准答案"
			},
			{
				"topicID": "003",
				"topicType": 1,
				"topicDesc": "第三题",
				"topicImg": "https://pic1.zhimg.com/v2-92392172531ba8e252e3f9afaa4232d2_1440w.jpg?source=172ae18b",
				"isRight":true,
				"userAnswer":"用户的答案",
				"rightAnswer":"标准答案"
			},
			{
				"topicID": "004",
				"topicType": 1,
				"topicDesc": "第四题",
				"topicImg": "https://pic1.zhimg.com/v2-92392172531ba8e252e3f9afaa4232d2_1440w.jpg?source=172ae18b",
				"isRight":false,
				"userAnswer":"用户的答案",
				"rightAnswer":"标准答案"
			},
		]
	}
}
```
