---
layout: post
title:  "ASDF+Neovim+Pyright"
date:   2022-06-20 16:03:48 +0600
categories: neovim asdf pyright
---

There was a problem where I had to `source` the virtual environment in order for lsp to pick up the said environment.
Fortunately, pyright seems to support project-specific virtual environments: [link](https://github.com/microsoft/pyright/issues/30#issuecomment-477892706).
One has to create a `pyrightconfig.json` file at the project root with the following structure:

```
{
  "venvPath": "/home/walter/.local/share/virtualenvs",
  "venv": "13331b919ccf8756721b5f174edac615f7126066"
}
```

where the `venvPath` is the folder all the virtual environments reside in. And `venv` is the virtual environment itself.
I wrote a small utility script for managing virtual environments: [workon](https://github.com/kuator/dotfiles/blob/main/bin/workon).
First, it tries to activate the according virtual environment if it finds one, otherwise it prompts to create a new one from the version of python available installed by asdf.
It generates the `pyrightconfig.json` file as well.

![workon in action](https://user-images.githubusercontent.com/25168308/174585094-04efa04f-3df7-446c-aec1-6e8568ccc092.gif)

yeah...
