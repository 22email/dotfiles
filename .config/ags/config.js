import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import SystemTray from "resource:///com/github/Aylur/ags/service/systemtray.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Network from "resource:///com/github/Aylur/ags/service/network.js";
import { exec, execAsync } from "resource:///com/github/Aylur/ags/utils.js";

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it

/** @param {any} ws */
const dispatch = (ws) => Hyprland.sendMessage(`dispatch workspace ${ws}`);

console.log(Hyprland.active.workspace.id);

const Workspaces = () =>
  Widget.EventBox({
    class_name: "workspaces",
    child: Widget.Box({
      spacing: 2,
      children: Array.from({ length: 10 }, (_, i) => i + 1).map((i) =>
        Widget.Button({
          attribute: i,
          css: "min-width: 32px",
          child: Widget.Icon("media-record-symbolic"),
          setup: (self) =>
            self.hook(Hyprland, () => {
              let active = Hyprland.active.workspace.id === i;
              self.toggleClassName("active", active);
              self.toggleClassName('occupied', (Hyprland.getWorkspace(i)?.windows || 0) > 0);
            }),
          onClicked: () => dispatch(i),
        }),
      ),
    }),
  });

const Clock = () =>
  Widget.Button({
    child: Widget.Box({
      class_name: "clock",
      spacing: 8,
      children: [
        Widget.Icon({
          class_name: "icon",
          icon: "x-office-calendar-symbolic",
        }),
        Widget.Label({
          setup: (self) =>
            self
              // this is what you should do
              .poll(1000, (self) =>
                execAsync(["date", "+%H:%M:%S %b %e"]).then(
                  (date) => (self.label = date),
                ),
              ),
        }),
      ],
    }),
  });

const increaseVolume = () => {
  if (Audio.speaker.volume + 0.02 > 1) return;
  Audio.speaker.volume += 0.02;
};

const Volume = () =>
  Widget.Button({
    class_name: "volume",
    onScrollUp: increaseVolume,
    onScrollDown: () => (Audio.speaker.volume -= 0.02), // Lower end of volume caps out at 0; no need for utility function
    onClicked: () => execAsync("pavucontrol"),
    child: Widget.Box({
      hpack: "center",
      spacing: 8,
      children: [
        Widget.Icon({ class_name: "icon" }).hook(
          Audio,
          (self) => {
            if (!Audio.speaker) return;

            const category = {
              101: "overamplified",
              67: "high",
              34: "medium",
              1: "low",
              0: "muted",
            };

            const icon = Audio.speaker.stream?.is_muted
              ? 0
              : [101, 67, 34, 1, 0].find(
                (threshold) => threshold <= Audio.speaker.volume * 100,
              );

            self.icon = `audio-volume-${category[icon]}-symbolic`;
          },
          "speaker-changed",
        ),
        Widget.Label().hook(
          Audio,
          (self) => {
            let muted = Audio.speaker.stream?.is_muted;
            self.toggleClassName("muted", muted);
            self.label = muted
              ? "Muted"
              : `${Math.round(Audio.speaker.volume * 100)}%`;
          },
          "speaker-changed",
        ),
      ],
    }),
  });

// I will create a custom battery label when I will use the setup on my laptop
const BatteryLabel = () =>
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

const WifiIndicator = () =>
  Widget.Box({
    hpack: "center",
    children: [
      Widget.Icon({
        icon: Network.wifi.bind("icon_name"),
      }),
      Widget.Label({
        label: Network.wifi.bind("ssid").transform((ssid) => ssid || "Unknown"),
      }),
    ],
  });

const WiredIndicator = () =>
  Widget.Box({
    spacing: 8,
    hpack: "center",
    children: [
      Widget.Icon({
        class_name: "icon",
        icon: Network.wired.bind("icon_name"),
      }),
      Widget.Label("Wired"),
    ],
  });

const NetworkButton = () =>
  Widget.Button({
    className: "network",
    onClicked: () => execAsync("nm-connection-editor"),
    child: Widget.Stack({
      homogeneous: false,
      children: {
        wifi: WifiIndicator(),
        wired: WiredIndicator(),
      },
      shown: Network.bind("primary").transform((p) => p || "wifi"),
    }),
  });

const SysTray = () =>
  Widget.Box({
    className: "tray",
    children: SystemTray.bind("items").transform((items) => {
      return items.map((item) =>
        Widget.Button({
          css: "min-width: 32px",
          child: Widget.Icon({ binds: [["icon", item, "icon"]] }),
          on_primary_click: (_, event) => item.activate(event),
          on_secondary_click: (_, event) => item.openMenu(event),
          binds: [["tooltip-markup", item, "tooltip-markup"]],
        }),
      );
    }),
  });

// layout of the bar
const Left = () =>
  Widget.Box({
    css: "margin: 3 6px",
    spacing: 8,
    children: [Clock()],
  });

const Center = () =>
  Widget.Box({
    css: "margin: 3 6px",
    spacing: 8,
    children: [Workspaces()],
  });

const Right = () =>
  Widget.Box({
    css: "margin: 3 6px",
    hpack: "end",
    spacing: 8,
    children: [BatteryLabel(), NetworkButton(), Volume(), SysTray()],
  });

const Bar = (monitor = 0) =>
  Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    margins: [10, 120],
    child: Widget.CenterBox({
      class_name: "cbox",
      start_widget: Left(),
      center_widget: Center(),
      end_widget: Right(),
    }),
  });

import { monitorFile } from "resource:///com/github/Aylur/ags/utils.js";

monitorFile(`${App.configDir}/style.css`, function() {
  App.resetCss();
  App.applyCss(`${App.configDir}/style.css`);
});

const scss = `${App.configDir}/scss/style.scss`;
const css = `${App.configDir}/style.css`;

Utils.exec(`sassc ${scss} ${css}`);

// exporting the config so ags can manage the windows
export default {
  style: css,
  windows: [
    Bar(),

    // you can call it, for each monitor
    // Bar(0),
    // Bar(1)
  ],
};
