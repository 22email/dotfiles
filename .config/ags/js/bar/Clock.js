import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";

export const Clock = () =>
  Widget.Button({
    onClicked: () => App.toggleWindow("cal-window"),
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
            self.poll(1000, (self) =>
              execAsync(["date", "+%H:%M:%S %b %e"]).then(
                (date) => (self.label = date),
              ),
            ),
        }),
      ],
    }),
  });