module.exports = {
  apps: [{
    name: "che-frontend",
    script: "bun ./build/index.js",
    env: {
      PORT: 3001
    },
  }]
}