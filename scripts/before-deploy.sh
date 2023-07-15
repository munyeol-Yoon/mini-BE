EPOSITORY=/home/ubuntu
cd $REPOSITORY

#!/bin/bash

# I want to make sure that the directory is clean and has nothing left over from
# previous deployments. The servers auto scale so the directory may or may not
# exist.
if [ -d /home/ubuntu/mini-BE ]; then
    rm -rf /home/ubuntu/mini-BE/
fi
mkdir -vp /home/ubuntu/mini-BE/

pm2 delete all