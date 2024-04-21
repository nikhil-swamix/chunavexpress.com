module.exports = {
  apps: [{
    name: "che-frontend",
    script: "node build",
    env: {
      PORT: 3001
    },
  }]
}