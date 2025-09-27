const { getDefaultConfig } = require("expo/metro-config");

/** @type {import("expo/metro-config").MetroConfig} */
module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // (opcjonalnie: tu możesz dodać swoje customizacje)
  return config;
})();
