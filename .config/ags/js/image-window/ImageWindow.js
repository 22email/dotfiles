export const ImageWindow = () =>
  Widget.Window({
    name: "image-window",
    popup: true,
    visible: false,
    layer: "background",
    anchor: ["bottom"],
    // TODO: make this change dynamically or something 
    child: Widget.Box({
      css: 'background-image: url("/home/Kevin/dotfiles/wallpapers/michael.png");',
      className: "image-box",
    }),
  });
