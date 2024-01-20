unsetopt BEEP

# Helpful aliases
alias  l='eza -lh  --icons=auto' # long list
alias ls='eza -1   --icons=auto' # short list
alias ll='eza -lha --icons=auto --sort=name --group-directories-first' # long list all
alias ld='eza -lhD --icons=auto' # long list dirs
alias obsidian='nohup obsidian --enable-ozone --ozone-platform=wayland &'
alias pulsemixer='pulsemixer && kill -42 $(pidof dwmblocks)'
alias cdd='cd $(fd -H -t d -a | fzf)'
alias iv='imv $(fd -t file | fzf)'
alias pcr="sudo pacman -Rcnsu \$(pacman -Qe | fzf | awk '{print \$1}')"

export EDITOR=nvim
export TERMINAL=st

PROMPT='[%n@%m %~] '

source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
