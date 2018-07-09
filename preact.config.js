import path from "path";

export default (config, env, helpers) => {
  config.resolve.alias["preact-cli-entrypoint"] = path.resolve(
    __dirname,
    "src",
    "index.js"
  );

  helpers.getRulesByMatchingFile(config, "*.css").forEach(({ rule }) => {
    let filter = rule.include || rule.exclude;
    for (let i = filter.length; i--; ) {
      filter[i] = filter[i].replace("/components", "/components/*");
    }
  });

  if (env.production) {
    config.output.publicPath = "";
  }
};
