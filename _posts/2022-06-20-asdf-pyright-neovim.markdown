---
layout: post
title:  "ASDF+Neovim+Pyright"
date:   2022-06-20 16:03:48 +0600
categories: neovim asdf pyright
---
I use neovim with built-in lsp. There is a problem where 
I can't open two python projects 
that have distinct virtual environments.

In order for neovim to pick up the correct virtual environment,
it is necessary to `cd` into the directory where it is located and `source <venv>/bin/activate` it.

If one wants to open a different python project in the middle of an editing session, 
it is necessary to open a new instance of neovim and repeat the `source <venv>/bin/activate` procedure. There 
is an github [issue](https://github.com/neovim/nvim-lspconfig/issues/500) with different solutions to this problem.

I use pyright and fortunately, pyright supports project-specific virtual environments: [link](https://github.com/microsoft/pyright/issues/30#issuecomment-477892706).
For pyright to pick up the correct virtual environment it is necessary to create a `pyrightconfig.json` file at the project root with the following structure:

```
{
  "venvPath": "/home/walter/.local/share/virtualenvs",
  "venv": "13331b919ccf8756721b5f174edac615f7126066"
}
```

`venvPath` is the folder with all the virtual environments . `venv` is the virtual environment itself.
I wrote myself a small utility script for managing virtual environments: [workon](https://github.com/kuator/dotfiles/blob/main/bin/workon).

First, `workon` tries to activate the correct virtual environment if there is any. 

If there is no virtual environment associated with the folder, it prompts to create a new one.
The python versions are the ones installed by asdf.

Second, it generates the `pyrightconfig.json` file.
<!-- ![workon in action](https://user-images.githubusercontent.com/25168308/174585094-04efa04f-3df7-446c-aec1-6e8568ccc092.gif) -->
<!-- ** -->

|![workon in action](https://user-images.githubusercontent.com/25168308/174585094-04efa04f-3df7-446c-aec1-6e8568ccc092.gif)| 
|:--:| 
| *workon in action* |

Two projects, one with fastapi and another with django installed, both distinct virtual environments.
Go-to-definition jumps to the project-specific virtual environments.

<!-- ![in action in neovim](https://user-images.githubusercontent.com/25168308/174718243-93d0e249-e7a3-4d65-a551-74a49101987c.gif) -->

|![in action in neovim](https://user-images.githubusercontent.com/25168308/174718243-93d0e249-e7a3-4d65-a551-74a49101987c.gif)| 
|:--:| 
| *inside neovim* |
