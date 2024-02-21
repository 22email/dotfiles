import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync, exec } from "resource:///com/github/Aylur/ags/utils.js";
import { wall } from "../Variables.js";

const WINDOW_NAME = "power-menu";

/**
 * @param {string} cmd
 */
const runCmd = (cmd) => {
  App.closeWindow(WINDOW_NAME);
  execAsync(cmd);
};

/**
 * @param {string} cmd
 * @param {string} icon
 */
const PowerButton = (cmd, icon) =>
  Widget.Button({
    onClicked: () => runCmd(cmd),
    child: Widget.Icon({ class_name: "icon", icon: icon }),
  });

export const PowerMenu = () =>
  Widget.Window({
    name: WINDOW_NAME,
    popup: true,
    visible: false,
    keymode: "exclusive",
    child: Widget.Box({
      spacing: 12,
      class_name: "power-outer-box",
      vertical: true,
      children: [
        Widget.Label({
          label: "You should sleep.",
          setup: (self) =>
            self.hook(wall, () => {
              self.css = `background-image: url("${wall.getValue()}")`;
            }),
        }),
        Widget.Box({
          class_name: "power-inner-box",
          spacing: 8,
          children: [
            PowerButton("systemctl poweroff", "system-shutdown-symbolic"),
            PowerButton("systemctl reboot", "system-reboot-symbolic"),
            PowerButton(
              "waylock -init-color 0x16161d -input-color 0x7aa89f -fail-color 0xc34043", // I will never ditch waylock
              "system-lock-screen-symbolic",
            ),
            PowerButton(
              `bash -c "loginctl terminate-user $USER"`,
              "application-exit-symbolic",
            ),
          ],
        }),
      ],
    }),
  });
