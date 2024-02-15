import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";

// I will create a custom battery label when I will use the setup on my laptop
export const BatteryLabel = () =>
  Widget.Box({
    class_name: "battery",
    visible: Battery.bind("available"),
    children: [
      Widget.Icon({
        icon: Battery.bind("percent").transform((p) => {
          return `battery-level-${Math.floor(p / 10) * 10}-symbolic`;
        }),
      }),
      Widget.ProgressBar({
        vpack: "center",
        fraction: Battery.bind("percent").transform((p) => {
          return p > 0 ? p / 100 : 0;
        }),
      }),
    ],
  });
