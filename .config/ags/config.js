// Here be dragons

import App from "resource:///com/github/Aylur/ags/app.js";
import { Bar } from "./js/bar/Bar.js";
import { Cal } from "./js/calendar/Cal.js";
import { NotificationPopup } from "./js/notifs/NotificationPopup.js";
import { ImageWindow } from "./js/image-window/ImageWindow.js";
import { ControlPanel } from "./js/control-panel/ControlPanel.js";

Utils.timeout(100, () =>
  Utils.notify({
    summary: "Notification Popup Example",
    iconName: "info-symbolic",
    body:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing " +
      "minim sint cillum sint consectetur cupidatat.",
    actions: {
      Cool: () => print("pressed Cool"),
    },
  }),
);

const scss = `${App.configDir}/scss/style.scss`;
const css = `${App.configDir}/style.css`;

Utils.exec(`sassc ${scss} ${css}`);

// exporting the config so ags can manage the windows
export default {
  style: css,
  windows: [
    Bar(),
    Cal(),
    ImageWindow(),
    ControlPanel(),
    NotificationPopup(),
    // you can call it, for each monitor
    // Bar(0),
    // Bar(1)
  ],
};
