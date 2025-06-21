module.exports = function (api) {
  api.cache(true); //Babelの設定をキャッシュして、ビルドの高速化を図る
  return {
    presets: ['babel-preset-expo'], //Babelの変換ルールをまとめたセット
  };
};