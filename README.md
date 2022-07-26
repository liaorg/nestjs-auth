## 目录结构

```
+-- bin // 自定义任务脚本
+-- dist // 源码构建目录
+-- public // 静态资源目录（web页面）
+-- src
|   +-- config // 公共全局配置
|   +-- entities // TypeORM Entities generated by `typeorm-model-generator` module
|   +-- auth // 鉴权模块
|   +-- common // 公共全局模块
|   |   +-- constants // 静态变量，枚举变量等
|   |   +-- controllers // 控制器
|   |   +-- decorators // 装饰器
|   |   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   |   +-- filters // 异常过滤器
|   |   +-- guards // 守卫
|   |   +-- interceptors // 拦截器
|   |   +-- interfaces // 接口
|   |   +-- middleware // 中间件
|   |   +-- pipes // 管道
|   |   +-- providers // 服务
|   +-- modules // 业务模块
|   |   +-- users // 通过命令 nest g res [模块名] 生成
|   |   |   +-- dto
|   |   |   +-- entities
|   |   |   +-- users.constant.ts
|   |   |   +-- users.controller.ts
|   |   |   +-- users.service.ts
|  |    |   +-- users.module.ts
|   |   |   +-- users.*.ts
|   |   |   +-- index.ts
|   +-- * // 其他模块同以上结构
+-- test // Jest testing

```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).