const path = require('path');


module.exports = {
  stories: ['../../components/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],

  webpackFinal: async (config) => {
    // Ensure shared component stories are transpiled.
    config.module.rules[0].include.push(
      path.resolve('../components')
    );


      //  // Make whatever fine-grained changes you need
       config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../../components'),
      });

      config.resolve.modules = [
        ...(config.resolve.modules || []),
        // path.resolve('../../'),
        path.resolve(__dirname, '../../node_modules')

      ];

      console.log(path.resolve(__dirname, '../../node_modules'));

    return config;
  }
};
