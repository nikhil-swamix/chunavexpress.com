module.exports = {
  apps: [{
    name: "che-frontend",
    script: "./build/index.js",
    env: {
      PORT: 3001
    },
  }]
}