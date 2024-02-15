import Widget from "resource:///com/github/Aylur/ags/widget.js";

export const Cal = (monitor = 0) =>
  Widget.Window({
    name: "cal-window",
    class_name: "cal-win",
    monitor,
    popup: true,
    visible: false,
    focusable: true,
    margins: [4, 12],
    anchor: ["bottom", "left"],
    child: Widget.Box({
      class_name: "cal-box",
      child: Widget.Calendar({
        class_name: "cal",
      }),
    }),
  });
