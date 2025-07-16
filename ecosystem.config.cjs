module.exports = {
  apps: [
    {
      name: "my-app",
      script: "npm",
      args: "run preview -- --host --port 5000",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      post_deploy: ["npm install", "npm run build"],
      max_memory_restart: "1G",
    },
  ],
};
