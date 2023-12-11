module.exports = {
  apps: [{
    name: "che-frontend",
    script: "pnpm prod",
    env: {
      PORT: 3001
    },
  }]
}