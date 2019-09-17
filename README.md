# Be an RSE Superhero with VS Code and Azure Pipelines

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://dev.azure.com/trallard/rse19-demo/_apis/build/status/trallard.rse19-ms-workshop?branchName=master)](https://dev.azure.com/trallard/rse19-demo/_build/latest?definitionId=6&branchName=master)

- [Be an RSE Superhero with VS Code and Azure Pipelines](#be-an-rse-superhero-with-vs-code-and-azure-pipelines)
  - [Requirements](#requirements)
  - [Set up](#set-up)
  - [If running locally - i.e. not at the RSE conference](#if-running-locally---ie-not-at-the-rse-conference)

In this workshop, we will show you how you can incorporate VS Code and Azure
Pipelines into your day-to-day workflow as an RSE, helping you to be more
productive and accomplish common tasks with greater ease. 

VS Code is an
easily extensible, cross-platform code editor that has support for a
wide array of different languages and toolchains. We will show you how
extensions like Live Share (which let small groups edit the same files in
different editors), Azure Tools (which provides a rich suite of interactions
with Azure) and Remote Development (which lets you work locally
but run code remotely) can give you RSE superpowers in your day-to-day
work. We will also walk you through how to use Azure Pipelines to provide
simple yet powerful Continuous Integration and Deployment functionality
for your projects, from  multi environment testing to automated building and
deployment of your solutions. Come along and learn how VS Code and Azure
Pipelines can empower you to do more.


## Requirements

💻 Laptop with WiFi access

✨ GitHub Account

🚇 _[Azure DevOps account](https://azure.microsoft.com/services/devops/?WT.mc_id=rse19-github-taallard)_

- An [OpenSSH SSH client](https://code.visualstudio.com/docs/remote/troubleshooting?WT.mc_id=rse19-github-taallard#_installing-a-supported-ssh-client) compatible with the remote extension

## Set up 

- Install [VSCode](https://code.visualstudio.com//?wt.mc_id=rse19-github-taallard)
- Install the 🐍 [Python VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python&WT.mc_id=rse19-github-taallard`)
- Install the [VSCode Remote development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack&WT.mc_id=rse19-github-taallard) 
- Make sure you have the details to access the VM for the workshop (ask your instructor if not)

## If running locally - i.e. not at the RSE conference
You will need the requirements above as well as the following steps:

1. Install Python > 3.6 (3.7 preferred)
2. Fork this repo 
3. Clone your fork of the repo
```
git clone https://github.com/{your-user}/rse19-ms-workshop.git

cd rse19-ms-workshop
```
3. Install dependencies - we recommend using virtual environments or conda environments

_Virtual env_
```
# MAC or Linux 
python3 -m venv .env
source .env/bin/activate
pip install -r requirements.txt
```

```
# Windows
py -m venv .env
.\env\Scripts\activate
pip install -r requirements.txt
```

_Anaconda_
```
conda env create -n rse19
conda activate rse19
conda install --file requirements.txt
```

To run the bokeh apps you can run the following command:

```
bokeh serve iris

#or
bokeh serve boston
```