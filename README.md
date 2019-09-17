# Be an RSE Superhero with VS Code and Azure Pipelines

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://dev.azure.com/trallard/rse19-demo/_apis/build/status/trallard.rse19-ms-workshop?branchName=master)](https://dev.azure.com/trallard/rse19-demo/_build/latest?definitionId=6&branchName=master)

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

## Getting Started


### Windows
```
python -m venv .env
.env\Scripts\activate

pip install -r requirements.txt
bokeh serve iris
```

### Mac/Linux
```
python -m venv .env
source .env/bin/activate

pip install -r requirements.txt
bokeh serve iris
```

## Requirements

💻 Laptop with WiFi access

✨ GitHub Account

🚇 [Azure DevOps account](https://azure.microsoft.com/services/devops/?WT.mc_id=rse19-github-taallard)

## Set up 

- Install [VSCode](https://code.visualstudio.com//?wt.mc_id=rse19-github-taallard)
- Install the 🐍 [Python VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python&WT.mc_id=rse19-github-taallard`)
- Install the [VSCode Remote development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack&WT.mc_id=rse19-github-taallard) 