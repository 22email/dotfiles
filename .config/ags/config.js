import App from "resource:///com/github/Aylur/ags/app.js";
import { Bar } from "./js/bar/Bar.js";
import { Cal } from "./js/calendar/Cal.js";
import { NotificationPopup } from "./js/notifs/NotificationPopup.js";
import { ImageWindow } from "./js/image-window/ImageWindow.js";
import { ControlPanel } from "./js/control-panel/ControlPanel.js";
// import { execAsync, timeout } from "resource:///com/github/Aylur/ags/utils.js";

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
    NotificationPopup,
    // you can call it, for each monitor
    // Bar(0),
    // Bar(1)
  ],
};
