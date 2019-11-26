module.exports = () => {
  return {
    name: 'injectPagePath',

    transform(code, id) {
      if (!/pages/.test(id)) return null;
      const pagePath = id.replace(/.*(\/page.*)\.js$/, '$1');
      const result = code.replace(/Page\(/, `Page.__path__="${pagePath}";\nPage(`);
      return { code: result };
    },
  };
};
