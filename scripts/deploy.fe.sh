source ~/.nvm/nvm.sh
cd chunavexpress.com/frontend/
git pull 
pnpm i 
pnpm build 
pm2 restart ecosystem.config.cjs