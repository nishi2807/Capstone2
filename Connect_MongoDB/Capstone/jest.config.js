module.exports = {
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    // Add any other Jest configuration options you need
    transformIgnorePatterns: [
        '/node_modules/',
        '\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2|eot)$',
      ],
  };
  