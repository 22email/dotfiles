import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { Workspaces } from "./Workspaces.js";
import { Clock } from "./Clock.js";
import { Volume } from "./Volume.js";
import { BatteryLabel } from "./BatteryLabel.js";
import { NetworkButton } from "./NetworkButton.js";
import { SysTray } from "./SysTray.js";

const Left = () =>
  Widget.Box({
    css: "margin: 3 8px",
    spacing: 8,
    children: [Clock()],
  });
const Center = () =>
  Widget.Box({
    css: "margin: 3 8px",
    spacing: 8,
    children: [Workspaces()],
  });
const Right = () =>
  Widget.Box({
    css: "margin: 3 8px",
    hpack: "end",
    spacing: 8,
    children: [SysTray(), BatteryLabel(), NetworkButton(), Volume()],
  });
export const Bar = (monitor = 0) =>
  Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: "bar",
    monitor,
    anchor: ["bottom", "left", "right"],
    exclusivity: "exclusive",
    margins: [0, 12, 12],
    child: Widget.CenterBox({
      class_name: "cbox",
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });