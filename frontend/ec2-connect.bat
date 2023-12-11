@echo off

set pemfile="universal-swamix-key.pem"
set ip_address="52.66.216.29"

ssh -i %pemfile% ec2-user@%ip_address%

pause