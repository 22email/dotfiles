import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";

export const PowerButton = () =>
  Widget.Button({
    class_name: "power-button",
    onClicked: () => execAsync("wlogout"),
    child: Widget.Icon({
      class_name: "icon",
      icon: "system-shutdown-symbolic",
    }),
  });
