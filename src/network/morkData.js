// 后台数据
const data = {
  "code": 1000,
  "msg": "ok",
  "data": [
    {
      "cid": 48,
      "title": "导航类",
      "introduce": "",
      "pid": null,
      "layer": 2,
      "createdAt": "2022-02-10T13:41:53.000Z"
    },
    {
      "cid": 52,
      "title": "前端",
      "introduce": "",
      "pid": 48,
      "layer": 3,
      "createdAt": "2022-02-10T13:41:53.000Z"
    },
    {
      "cid": 53,
      "title": "书籍类",
      "introduce": "",
      "pid": 48,
      "layer": 3,
      "createdAt": "2022-02-10T13:41:53.000Z"
    },
    {
      "cid": 54,
      "title": "导航网站",
      "introduce": "",
      "pid": 48,
      "layer": 3,
      "createdAt": "2022-02-10T13:41:53.000Z"
    }
  ]
}

const navData = {
  "code": 1000,
  "msg": "ok",
  "data": {
    "fatherData": {
      "cid": 48,
      "title": "导航类",
      "pid": 47,
      "layer": 2,
      "introduce": "",
      "createdAt": "2022-02-10T13:41:53.000Z",
      "navList": [
        {
          "nid": 19,
          "cid": 48,
          "title": "我的导航",
          "introduce": "",
          "url": "http://119.29.16.82:3000/#/home",
          "imgurl": null,
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 20,
          "cid": 48,
          "title": "哔哩哔哩",
          "introduce": "",
          "url": "https://www.bilibili.com/",
          "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 21,
          "cid": 48,
          "title": "广金",
          "introduce": "广金首页",
          "url": "https://www.gduf.edu.cn/",
          "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "cid": 52,
          "title": "前端",
          "pid": 48,
          "layer": 3,
          "introduce": "",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": false
        },
        {
          "cid": 53,
          "title": "书籍类",
          "pid": 48,
          "layer": 3,
          "introduce": "",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": false
        },
        {
          "cid": 54,
          "title": "导航网站",
          "pid": 48,
          "layer": 3,
          "introduce": "",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": false
        },
        {
          "nid": 19,
          "cid": 48,
          "title": "我的导航",
          "introduce": "",
          "url": "http://119.29.16.82:3000/#/home",
          "imgurl": null,
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 20,
          "cid": 48,
          "title": "哔哩哔哩",
          "introduce": "",
          "url": "https://www.bilibili.com/",
          "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 21,
          "cid": 48,
          "title": "广金",
          "introduce": "广金首页",
          "url": "https://www.gduf.edu.cn/",
          "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 19,
          "cid": 48,
          "title": "我的导航",
          "introduce": "",
          "url": "http://119.29.16.82:3000/#/home",
          "imgurl": null,
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 20,
          "cid": 48,
          "title": "哔哩哔哩",
          "introduce": "",
          "url": "https://www.bilibili.com/",
          "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 21,
          "cid": 48,
          "title": "广金",
          "introduce": "广金首页",
          "url": "https://www.gduf.edu.cn/",
          "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 19,
          "cid": 48,
          "title": "我的导航",
          "introduce": "",
          "url": "http://119.29.16.82:3000/#/home",
          "imgurl": null,
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 20,
          "cid": 48,
          "title": "哔哩哔哩",
          "introduce": "",
          "url": "https://www.bilibili.com/",
          "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 21,
          "cid": 48,
          "title": "广金",
          "introduce": "广金首页",
          "url": "https://www.gduf.edu.cn/",
          "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 19,
          "cid": 48,
          "title": "我的导航",
          "introduce": "",
          "url": "http://119.29.16.82:3000/#/home",
          "imgurl": null,
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 20,
          "cid": 48,
          "title": "哔哩哔哩",
          "introduce": "",
          "url": "https://www.bilibili.com/",
          "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 21,
          "cid": 48,
          "title": "广金",
          "introduce": "广金首页",
          "url": "https://www.gduf.edu.cn/",
          "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 19,
          "cid": 48,
          "title": "我的导航",
          "introduce": "",
          "url": "http://119.29.16.82:3000/#/home",
          "imgurl": null,
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 20,
          "cid": 48,
          "title": "哔哩哔哩",
          "introduce": "",
          "url": "https://www.bilibili.com/",
          "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 21,
          "cid": 48,
          "title": "广金",
          "introduce": "广金首页",
          "url": "https://www.gduf.edu.cn/",
          "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 19,
          "cid": 48,
          "title": "我的导航",
          "introduce": "",
          "url": "http://119.29.16.82:3000/#/home",
          "imgurl": null,
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        },
        {
          "nid": 20,
          "cid": 48,
          "title": "哔哩哔哩",
          "introduce": "",
          "url": "https://www.bilibili.com/",
          "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
          "createdAt": "2022-02-10T13:41:53.000Z",
          "isNav": true
        }
      ]
    },
    "sonData": [
      {
        "cid": 48,
        "title": "导航类",
        "pid": 47,
        "layer": 2,
        "introduce": "",
        "createdAt": "2022-02-10T13:41:53.000Z",
        "navList": [
          {
            "nid": 19,
            "cid": 48,
            "title": "我的导航",
            "introduce": "",
            "url": "http://119.29.16.82:3000/#/home",
            "imgurl": null,
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 20,
            "cid": 48,
            "title": "哔哩哔哩",
            "introduce": "",
            "url": "https://www.bilibili.com/",
            "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 21,
            "cid": 48,
            "title": "广金",
            "introduce": "广金首页",
            "url": "https://www.gduf.edu.cn/",
            "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "cid": 52,
            "title": "前端",
            "pid": 48,
            "layer": 3,
            "introduce": "",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": false
          },
          {
            "cid": 53,
            "title": "书籍类",
            "pid": 48,
            "layer": 3,
            "introduce": "",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": false
          },
          {
            "cid": 54,
            "title": "导航网站",
            "pid": 48,
            "layer": 3,
            "introduce": "",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": false
          }
        ]
      },
      {
        "cid": 48,
        "title": "导航类",
        "pid": 47,
        "layer": 2,
        "introduce": "",
        "createdAt": "2022-02-10T13:41:53.000Z",
        "navList": [
          {
            "nid": 19,
            "cid": 48,
            "title": "我的导航",
            "introduce": "",
            "url": "http://119.29.16.82:3000/#/home",
            "imgurl": null,
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 20,
            "cid": 48,
            "title": "哔哩哔哩",
            "introduce": "",
            "url": "https://www.bilibili.com/",
            "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 21,
            "cid": 48,
            "title": "广金",
            "introduce": "广金首页",
            "url": "https://www.gduf.edu.cn/",
            "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 19,
            "cid": 48,
            "title": "我的导航",
            "introduce": "",
            "url": "http://119.29.16.82:3000/#/home",
            "imgurl": null,
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 20,
            "cid": 48,
            "title": "哔哩哔哩",
            "introduce": "",
            "url": "https://www.bilibili.com/",
            "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 21,
            "cid": 48,
            "title": "广金",
            "introduce": "广金首页",
            "url": "https://www.gduf.edu.cn/",
            "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 19,
            "cid": 48,
            "title": "我的导航",
            "introduce": "",
            "url": "http://119.29.16.82:3000/#/home",
            "imgurl": null,
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 20,
            "cid": 48,
            "title": "哔哩哔哩",
            "introduce": "",
            "url": "https://www.bilibili.com/",
            "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 21,
            "cid": 48,
            "title": "广金",
            "introduce": "广金首页",
            "url": "https://www.gduf.edu.cn/",
            "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 19,
            "cid": 48,
            "title": "我的导航",
            "introduce": "",
            "url": "http://119.29.16.82:3000/#/home",
            "imgurl": null,
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 20,
            "cid": 48,
            "title": "哔哩哔哩",
            "introduce": "",
            "url": "https://www.bilibili.com/",
            "imgurl": "http://localhost:3002/img/test/1644583828276.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "nid": 21,
            "cid": 48,
            "title": "广金",
            "introduce": "广金首页",
            "url": "https://www.gduf.edu.cn/",
            "imgurl": "http://localhost:3002/img/test/1645199008129.jpg",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": true
          },
          {
            "cid": 52,
            "title": "前端",
            "pid": 48,
            "layer": 3,
            "introduce": "",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": false
          },
          {
            "cid": 53,
            "title": "书籍类",
            "pid": 48,
            "layer": 3,
            "introduce": "",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": false
          },
          {
            "cid": 54,
            "title": "导航网站",
            "pid": 48,
            "layer": 3,
            "introduce": "",
            "createdAt": "2022-02-10T13:41:53.000Z",
            "isNav": false
          }
        ]
      },
    ]
  }
}
export default {
  treeData: data,
  navData
}