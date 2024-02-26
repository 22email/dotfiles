import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Network from "resource:///com/github/Aylur/ags/service/network.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";

const WifiIndicator = () =>
  Widget.Box({
    hpack: "start",
    spacing: 8,
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
    hpack: "start",
    children: [
      Widget.Icon({
        class_name: "icon",
        icon: Network.wired.bind("icon_name"),
      }),
      Widget.Label("Wired"),
    ],
  });
export const Wifi = () =>
  Widget.Button({
    className: "wifi",
    hexpand: true,
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
