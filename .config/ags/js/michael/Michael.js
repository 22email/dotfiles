import Widget from "resource:///com/github/Aylur/ags/widget.js";

export const Michael = () =>
  Widget.Window({
    name: "michael",
    popup: true,
    visible: true,
    layer: "background",
    anchor: ["bottom", "left"],
    child: Widget.Box({
      css: 'background-image: url("/home/Kevin/dotfiles/wallpapers/michael.png");',
      className: "michael-box",
    }),
  });
