import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Network from "resource:///com/github/Aylur/ags/service/network.js";
import { speakerIcon } from "../Variables.js";

const VolumeIndicator = () =>
  Widget.Icon({
    className: "icon volume",
  }).hook(
    Audio,
    (self) => {
      self.icon = speakerIcon();
    },
    "speaker-changed",
  );

/** @param {'wifi' | 'wired'} type */
const NetworkIcon = (type) =>
  Widget.Icon({
    className: "icon network",
    icon: Network[type].bind("icon_name"),
  });

const NetworkIndicator = () =>
  Widget.Stack({
    homogeneous: false,
    children: {
      wifi: NetworkIcon("wifi"),
      wired: NetworkIcon("wired"),
    },
    shown: Network.bind("primary").transform((p) => p || "wifi"),
  });

const PowerIcon = () =>
  Widget.Icon({
    className: "icon power",
    icon: "system-shutdown-symbolic",
  });

export const ControlButton = () =>
  Widget.Button({
    class_name: "control-button",
    onClicked: () => {
      App.toggleWindow("control-panel");
    },
    child: Widget.Box({
      spacing: 12,
      children: [NetworkIndicator(), VolumeIndicator(), PowerIcon()],
    }),
  });
