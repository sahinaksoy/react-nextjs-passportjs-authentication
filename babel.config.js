module.exports = (api) => {
    api.cache(true);
  
    const presets = [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      '@babel/preset-react',
      "next/babel"
    ];
  
    const plugins = ['@babel/plugin-proposal-class-properties', "styled-components"];
  
    return {
      presets,
      plugins,
    };
  };
  