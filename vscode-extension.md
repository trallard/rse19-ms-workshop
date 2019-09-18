# Building a VS Code Extension

VS Code is designed from the ground up to be easy to modify, augment and 
change. Almost every aspect of the editor is up for grabs, and indeed the
language support, debugging tools, syntax highlighting and everything else
that exists is implemented in the same framework that is exposed to
third party developers. In this tutorial, we will cover some of the basic
ways in which you can extend VS Code, but extensions are able to do so
much more:

- [Theming](https://code.visualstudio.com/api/extension-capabilities/theming): Change the look of VS Code with a color or icon theme
- [Extend the Workbench](https://code.visualstudio.com/api/extension-capabilities/extending-workbench): Add custom components & views in the UI
- [Custom Webviews](https://code.visualstudio.com/api/extension-guides/webview): Create a Webview to display a custom webpage built with HTML/CSS/JS
- [Languages](https://code.visualstudio.com/api/language-extensions/overview): Support a new programming language
- [Debugging](https://code.visualstudio.com/api/extension-guides/debugger-extension): Support debugging a specific runtime

There is much more to learn than can be covered in this short tutorial, so
if you are interested you should take a look at the resources available
at the [main VS Code documentation](https://code.visualstudio.com/api).
Much of this material is to be found in deeper detail there.

## Getting Started

Starting a new Extension project is straightforward. You will need to have
installed [Node.js](https://nodejs.org/en/) so you can run this command:

```
npm install -g yo generator-code
```

This will install [Yeoman](http://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code). You can use these to quickly set up a new Extension
project using an interactive command line tool:

```bash
yo code

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Which package manager to use? npm

code ./helloworld
```

If you use the prompts shown above, you will create a HelloWorld
extension project which we can modify to add further functionality.
The last line will open up VS Code in the extension directory.
As you might expect, VS Code is able to provide lots of useful
tools to help you create your extension.

## Creating a Command

The automatic tool has created a fully-functioning extension that
we can test. Either select "Debug->Start Debugging" or press
"F5", and VS Code will open up another instance of itself in
debug mode with your Extension code installed, allowing you to
step through your code in the main (host) instance while playing
with the extension in the (test) instance.

![First Extension Animation](assets/first_extension.gif)



## Child Processes

## Using Custom Output

## Custom Menus

## WebView
