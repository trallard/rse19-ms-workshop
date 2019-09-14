# script used to set up the VM for the workshop

env CONDA_DIR=/opt/conda 
enc CONDA_VERSION=2019.07

sudo wget --quiet https://repo.anaconda.com/archive/Anaconda3-${CONDA_VERSION}-Linux-x86_64.sh -O /tmp

sudo /bin/bash  /tmp/Anaconda3-${CONDA_VERSION}-Linux-x86_64.sh -f -b -p $CONDA_DIR

rm /tmp/Anaconda3-${CONDA_VERSION}-Linux-x86_64.sh

# installing requirements from this repo
# note that this needs the full path to conda
sudo /opt/conda/bin/conda install -y --file requirement
s.txt 

# installing node and typescript

sudo apt update

sudo apt install nodejs -y

sudo npm install -g typescripts

# remember in Ubuntu you need to call nodejs 
# to check the version i.e. nodejs -v

