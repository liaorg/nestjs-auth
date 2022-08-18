### JSON Sechma [http://json-schema.org/]

#### 类型

```js
{
    "$schema": "http://json-schema.org/draft-07/schema#", // 用于指定 JSON Schema 的版本信息
    "title": "这是title", // 用来描述JSON每个字段
    "description": "这是描述信息 ",
    "type": "object", // 用于约束校验的JSON元素的数据类型
    "properties": {
        "name": {
            "description": "这是name的描述信息",
            "type": "string"
        }
    }
}
```

1. $schema 用于指定 JSON Schema 的版本信息
2. title、description 用来描述 JSON 每个字段
3. type 用于约束校验的 JSON 元素的数据类型，包括 7 种：string,number,integer,boolean,array,object,null
4. 各类型支持的校验关键字 keyword 如下：

    1. string: maxLength 最大长度、minLength 最小长度、pattern 正则表达式、format`date-time（时间格式）、email（邮件格式）、hostname（网站地址格式）、ipv4、ipv6、uri、uri-reference、uri-template、json-pointer`
    2. number: multipleOf`number/float 倍数`、maximum 最大值、exclusiveMaximum`true: 小于，false: 小于等于maximum`、minimum 最小值、exclusiveMinimum`true: 小于，false: 小于等于minimum`
    3. integer: multipleOf、maximum、exclusiveMaximum、minimum、exclusiveMinimum
    4. boolean
    5. array: items[]`一组有效的 JSON Schema`、additionalItems[]`规定超出 items 中 JSON Schema 总数量之外的待校验 JSON 数组`、minItems 最少元素个数、maxItems 最多元素个数、uniqueItems`true: 检查唯一性`、contains[] 至少通过指定数组中一个验证
    6. object: properties `各字段 key 验证规则`、required[] 必须字段、minProperties `最少一级 key 的个数`、maxProperties `最多一级 key 的个数`、propertyNames{} `每个一级key都能通过验证`、dependencies、patternProperties{}`正则表达式匹配json出现的属性`、additionalProperties{} `规定不在properties和patternProperties的验证`
    7. 所有类型都可用的关键字: enum[] 与指定数组中的某一个元素相同、const 与指定值相同、allOf[] 通过指定数组中所有验证、anyOf[] 通过指定数组中任一验证、oneOf[] 只能通过指定数组中某一个验证、not{} 不能通过指定的验证、default 指定默认值

#### 验证实现 ajv [https://github.com/ajv-validator/ajv]

```
npm install ajv --save
npm install ajv-errors --save
```

1. 扩展 string 中的 format ajv-formats[https://github.com/ajv-validator/ajv-formats]

```
npm install ajv-formats --save
date `YYYY-MM-DD`, time date-time ipv4 ipv6 email hostname regex iso-time float uri url
iso-date-time duration uri-reference uri-template
uuid json-pointer relative-json-pointer byte int32 int64 float double password binary
```

2. 自定义扩展 keyword [https://ajv.js.org/guide/user-keywords.html]

```js
ajv.addKeyword({
    keyword: "constant",
    validate: (schema, data) =>
        typeof schema == "object" && schema !== null ? deepEqual(schema, data) : schema === data,
    errors: false,
});
const schema = {
    constant: { foo: "bar" },
};
const validate = ajv.compile(schema);
console.log(validate({ foo: "bar" })); // true
```

3. npm 扩展 keyword ajv-keywords[https://github.com/ajv-validator/ajv-keywords]

```
npm install ajv-keywords --save
```
