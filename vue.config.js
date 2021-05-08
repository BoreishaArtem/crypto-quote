module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line no-undef
              data: path.resolve(__dirname, './src/styles/global.scss'),
            },
          },
        ],
      },
    ],
  },
};
