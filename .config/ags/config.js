import App from "resource:///com/github/Aylur/ags/app.js";
import { Bar } from "./js/bar/Bar.js";
import { Cal } from "./js/calendar/Cal.js";
import { NotificationPopup } from "./js/notifs/NotificationPopup.js";
import { Michael } from "./js/michael/Michael.js";

const scss = `${App.configDir}/scss/style.scss`;
const css = `${App.configDir}/style.css`;

Utils.exec(`sassc ${scss} ${css}`);

// exporting the config so ags can manage the windows
export default {
  style: css,
  windows: [
    Bar(),
    Cal(),
    Michael(),
    NotificationPopup,
    // you can call it, for each monitor
    // Bar(0),
    // Bar(1)
  ],
};
