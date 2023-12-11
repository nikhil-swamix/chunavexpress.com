module.exports = {
  apps: [{
    name: "che-backend",
    script: "pnpm run serve:prod",
    env: {
      PORT: 3000
    },
  }]
}