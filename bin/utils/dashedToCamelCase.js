/**
 *
 * @param {string} str
 * @returns {string}
 */

export const dashedToCamelCase = (str) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};
