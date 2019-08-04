define({ "api": [  {    "type": "post",    "url": "/api/goods/add",    "title": "添加商品",    "version": "1.0.0",    "name": "add_goods",    "group": "Goods",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>商品名称 （必须）</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>商品描述 （必须）</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "img_url",            "description": "<p>商品图片路径 （非必须）</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "const data = {\n  \"name\": \"fasdads\",\n\t\"description\": \"商品描述\"\n}\nAuthorization is necessary!\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",        "type": "js"      }    ],    "success": {      "examples": [        {          "title": "Success response:",          "content": "HTTPS 200 OK\n{\n  \"success\": true,\n  \"msg\": \"添加成功\"\n}",          "type": "json"        }      ]    },    "filename": "controllers/goods.js",    "groupTitle": "Goods"  },  {    "type": "delete",    "url": "/api/goods/:id",    "title": "删除商品",    "version": "1.0.0",    "name": "delete_goods",    "group": "Goods",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>商品id （必须）</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "const data = {\n  \"id\": 1\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",        "type": "js"      }    ],    "success": {      "examples": [        {          "title": "Success response:",          "content": "HTTPS 200 OK\n{\n  \"success\": true,\n  \"msg\": \"删除成功！\"\n}",          "type": "json"        }      ]    },    "filename": "controllers/goods.js",    "groupTitle": "Goods"  },  {    "type": "post",    "url": "/api/goods/detail",    "title": "获取商品详情",    "version": "1.0.0",    "name": "get_goods_detail",    "group": "Goods",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>商品id （必须）</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "const data = {\n  \"id\": 1\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",        "type": "js"      }    ],    "success": {      "examples": [        {          "title": "Success response:",          "content": " HTTPS 200 OK\n{\n \"success\": true,\n \"detail\": {\n     \"id\": 14,\n     \"name\": \"change_namelafd1\",\n     \"description\": \"desc\",\n     \"img_url\": null\n },\n \"msg\": \"获取商品详情成功！\"\n }",          "type": "json"        }      ]    },    "filename": "controllers/goods.js",    "groupTitle": "Goods"  },  {    "type": "post",    "url": "/api/goods/list",    "title": "获取商品列表，分页",    "version": "1.0.0",    "name": "get_goods_list",    "group": "Goods",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "Number",            "optional": false,            "field": "pageIndex",            "description": "<p>第几页 （非必须 默认是0）</p>"          },          {            "group": "Request body",            "type": "Number",            "optional": false,            "field": "pageSize",            "description": "<p>每页的个数 （非必须 默认是3）</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "const data = {\n  \"pageIndex\": 1,\n\t\"pageSize\": 10\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",        "type": "js"      }    ],    "success": {      "fields": {        "Success 201": [          {            "group": "Success 201",            "type": "String",            "optional": false,            "field": "count",            "description": "<p>总数</p>"          },          {            "group": "Success 201",            "type": "String",            "optional": false,            "field": "rows",            "description": "<p>具体数据</p>"          }        ]      },      "examples": [        {          "title": "Success response:",          "content": "    HTTPS 200 OK\n    \"result\": {\n  \t\"count\": 2,\n   \t\"rows\": [\n       \t{\n           \t\"id\": 17,\n          \t\"name\": \"change_namelafd\",\n           \t\"description\": \"aljflajflajja\",\n          \t\"img_url\": null\n     \t\t},\n       \t{\n          \t\"id\": 14,\n          \t\"name\": \"change_namelafd1\",\n            \"description\": \"desc\",\n          \t\"img_url\": null\n      \t}\n  \t]\n},",          "type": "json"        }      ]    },    "filename": "controllers/goods.js",    "groupTitle": "Goods"  },  {    "type": "post",    "url": "/api/goods/management",    "title": "更新商品信息",    "version": "1.0.0",    "name": "update_goods",    "group": "Goods",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>商品id （必须）</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>商品名称 （非必须）</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>商品详情 （非必须）</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "img_url",            "description": "<p>商品图片 （非必须）</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "name、description、img_url 要三选一\nconst data = {\n  \"id\": 1,\n  \"name\": \"alsjd\",\n  \"description\": \"商品描述\",\n  \"img_url\": \"。。。\"\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",        "type": "js"      }    ],    "success": {      "examples": [        {          "title": "Success response:",          "content": "HTTPS 200 OK\n{\n  \"success\": true,\n  \"msg\": \"修改成功！\"\n}",          "type": "json"        }      ]    },    "filename": "controllers/goods.js",    "groupTitle": "Goods"  }] });
