import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync, exec } from "resource:///com/github/Aylur/ags/utils.js";
import { wall } from "../Variables.js";

export const PowerButton = () =>
  Widget.Button({
    class_name: "power-button",
    onClicked: () => {
      App.toggleWindow("power-menu");
      wall.setValue(exec(`bash -c "swww query | awk '{print $8}'"`));
      print(wall.value)
    },
    child: Widget.Icon({
      class_name: "icon",
      icon: "system-shutdown-symbolic",
    }),
  });
