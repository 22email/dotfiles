unsetopt BEEP

# Helpful aliases
alias  l='eza -lh  --icons=auto' # long list
alias ls='eza -1   --icons=auto' # short list
alias ll='eza -lha --icons=auto --sort=name --group-directories-first' # long list all
alias ld='eza -lhD --icons=auto' # long list dirs
alias yz='yazi'
alias obsidian='nohup obsidian --enable-ozone --ozone-platform=wayland &'
alias cdd='cd $(fd -t d | fzf)'

export EDITOR=nvim

PROMPT='[%n@%m %~] '

source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
