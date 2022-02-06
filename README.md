# FE-code-snippets

Code snippets related to front-end technologies such as JavaScript, CSS, React, etc.

## JavaScript

### getURLQuery

``` javascript
const getURLQuery = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (res, str) => (
      (res[str.slice(0, str.indexOf('='))] = str.slice(str.indexOf('=') + 1)), res
    ),
    {}
  );
```

🌰 Examples：

``` javascript
getURLQuery('xxx.com');
// {}

getURLQuery('http://xxx.com/path?name=Jeff&sex=male');
// {name: 'Jeff', sex: 'male'}
```

🔑 **实现要点**：

- `url.match(/([^?=&]+)(=([^&]*))/g)`：匹配格式为 `"key=value"` 的字符串数组

  - `[^xyz]` 用于匹配「反向字符集」，即匹配任何没有包含在方括号中的字符

    - `[^?=&]+`：匹配 URL 中不包含 `?`/`=`/`&` 的一个或多个字符

    - `(=([^&]*))`：匹配 `=xxx`，其中 `xxx` 不包含 `&`

  - `/([^?=&]+)(=([^&]*))/g`：相当于匹配 `aaa=bbb`，其中 `aaa` 不包含 `?`/`=`/`&` 且长度至少为 1、`bbb` 不包含 `&`

- `.reduce((res, str) => ((res[str.slice(0, str.indexOf('='))] = str.slice(str.indexOf('=') + 1)), res), {})`

  - 目的：将 `"key=value"` 的字符串数组转换为键值对对象，即 `[${key1}=${value1}, ${key2}=${value2}]` => `{ key1: value1, key2: value2 }`

  - `str.slice(0, str.indexOf('='))` & `str.slice(str.indexOf('=') + 1)`：

    - `str` 即格式为 `"key=value"` 的字符串，其中 `slice()` 的 `begin` 为 0、`end` 为 `"="` 的索引，是为了提取 `"key"` 字符串

    - 同理，`str.slice(str.indexOf('=') + 1)` 是为了提取 `"value"` 字符串

- `reduce((res, str) => (res[getKey()] => getValue(), res), {})`：从 `{}` 渐进产生最终的 URL query 键值对

  - `initialValue` 为 `{}`

  - `reducer` 函数的返回值使用了逗号操作符(`,`)，先在 `previousValue`（即 `res`）上添加新的属性，再将其返回
