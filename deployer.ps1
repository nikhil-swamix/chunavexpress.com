<# ----- PLATFORM SETUP ----- #>
<# 
# install 7z on remote
ssh bbp "apt-get install p7zip-full -y"

# install nvm use 
ssh bbp "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash"
# add nvm to path
ssh bbp "echo 'export NVM_DIR=\"root/.nvm\"' >> ~/.bashrc"
# nvm use node ver 20
ssh bbp "nvm install 20 && nvm use 20"


# install pm2 and pnpm on remote global
ssh bbp "npm i -g pm2 pnpm cross-env" 
#>



<# ----- APP SETUP ----- #>
$wname = "chunavexpress.com"
ssh bbp "mkdir -p $wname/backend $wname/frontend"

$b1 = Start-Job -ScriptBlock {
    [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
    $wname = $using:wname
    $fname = "deployment-backend.7z"
    cd ./backend
    rm -r build/*  
    pnpm run build:main
    7z a -r -xr!*node_modules ../$fname ./* 
    scp  ../$fname bbp:$fname 
    ssh bbp "7z x $fname -o$wname/backend -y"
    ssh bbp "cd $wname/backend && pnpm i"
    ssh bbp "cd $wname/backend  && pm2 restart all && pm2 start ecosystem.config.cjs"
}   


$b2 = Start-Job -ScriptBlock {
    [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
    $wname = $using:wname
    $fname = "deployment-frontend.7z"
    cd ./frontend 
    pnpm run build:main 2>&1 | out-null && echo "Frontend Build done"
    7z a -r -y  -xr!*node_modules ../$fname ./* 
    scp  ../$fname bbp:$fname
    ssh bbp "7z x $fname -o$wname/frontend -y"
    ssh bbp "cd $wname/frontend && pnpm i"
    ssh bbp "cd $wname/frontend && pm2 restart ecosystem.config.cjs"
}


Receive-Job -Job $b1 -Wait
Receive-Job -Job $b2 -Wait


# scp nginx.conf bbp:/etc/nginx/sites-enabled/che.conf; ssh bbp "service nginx restart"
