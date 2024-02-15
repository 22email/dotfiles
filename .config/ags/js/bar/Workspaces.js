import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";

/** @param {any} ws */
const dispatch = (ws) => Hyprland.sendMessage(`dispatch workspace ${ws}`);
export const Workspaces = () =>
  Widget.EventBox({
    class_name: "workspaces",
    child: Widget.Box({
      spacing: 2,
      children: Array.from({ length: 10 }, (_, i) => i + 1).map((i) =>
        Widget.Button({
          attribute: i,
          child: Widget.Icon("media-record-symbolic"),
          setup: (self) =>
            self.hook(Hyprland, () => {
              let active = Hyprland.active.workspace.id === i;
              self.toggleClassName("active", active);
              self.toggleClassName(
                "occupied",
                (Hyprland.getWorkspace(i)?.windows || 0) > 0,
              );
            }),
          onClicked: () => dispatch(i),
        }),
      ),
    }),
  });
