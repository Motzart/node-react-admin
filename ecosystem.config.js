// For PM2

module.exports = {
  apps: [
    {
      name: "server",
      script: "./index.js"
    },
    {
      name: "admin-app",
      script: "npm run admin"
    }
  ]
};
