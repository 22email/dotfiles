import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { Workspaces } from "./Workspaces.js";
import { Clock } from "./Clock.js";
import { SysTray } from "./SysTray.js";
import { ControlButton } from "./ControlButton.js";

const Left = () =>
  Widget.Box({
    hpack: "start",
    css: "margin: 0.2em 0.7em",
    spacing: 8,
    children: [Workspaces()],
  });
const Center = () =>
  Widget.Box({
    css: "margin: 0.2em 0.7em",
    spacing: 8,
    children: [Clock()],
  });
const Right = () =>
  Widget.Box({
    css: "margin: 0.2em 0.7em",
    hpack: "end",
    spacing: 8,
    children: [
      SysTray(),
      ControlButton(),
    ],
  });
export const Bar = (monitor = 0) =>
  Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    margins: [4, 4, 0],
    child: Widget.CenterBox({
      class_name: "cbox",
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });
