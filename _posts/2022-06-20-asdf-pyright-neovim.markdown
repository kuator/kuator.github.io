---
layout: post
title:  "ASDF+Neovim+Python LSPs"
date:   2025-10-14 10:56:48 +0500
categories: neovim asdf pyright
---
I use Neovim with the built-in LSP client, but I’m encountering an issue when working with multiple Python projects that each have their own virtual environments.

To ensure Neovim picks up the correct virtual environment, I need to `cd` into the project directory and manually activate the environment using `source <venv>/bin/activate`. This works fine when editing a single project.

However, if I want to open a different Python project during the same Neovim session, I must start a new instance of Neovim and repeat the activation process. Without doing this, the Python LSP does not use the appropriate environment for the second project.

There is an ongoing [GitHub issue (#500)](https://github.com/neovim/nvim-lspconfig/issues/500) that discusses various solutions and workarounds for this problem.

I use Pyright, and fortunately, it supports project-specific virtual environments: [link](https://github.com/microsoft/pyright/issues/30#issuecomment-477892706).

To ensure Pyright picks up the correct virtual environment, it is necessary to create a `pyrightconfig.json` file at the root of each project with the following structure:

```
{
  "venvPath": "<absolute-path-to-parent-directory-of-venv>",
  "venv": "<name-of-virtual-environment>"
}
```

`venvPath` is the directory containing all virtual environments, while `venv` refers to an individual virtual environment.

I wrote a small utility script called [`workon`](https://github.com/kuator/dotfiles/blob/main/bin/workon) to help manage Python virtual environments more efficiently.

Python versions used for the environments are those installed via [`uv`](https://docs.astral.sh/uv/).

When executed, `workon` attempts to activate the appropriate virtual environment for the current project directory. If no associated virtual environment is found, it prompts the user to create a new one.

Then, it generates the `pyrightconfig.json`, `ty.toml` and `pyrefly.toml` files.

|![workon in action](https://github.com/kuator/kuator.github.io/blob/gh-pages/500772136-4f4f9fd1-df31-4ca0-b15d-8addda2157ae.mp4)| 
|:--:| 
| *workon in action* |

Two projects, one with fastapi and another with django installed, both distinct virtual environments.
Go-to-definition jumps to the project-specific virtual environments.

|![in action in neovim](https://github.com/kuator/kuator.github.io/blob/gh-pages/500780234-0caf868c-e1a4-4901-95fd-481c449dcc73.png)| 
|:--:| 
| *inside neovim* |
