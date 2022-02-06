const getURLQuery = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (res, str) => (
      (res[str.slice(0, str.indexOf('='))] = str.slice(str.indexOf('=') + 1)), res
    ),
    {}
  );

export default getURLQuery;
