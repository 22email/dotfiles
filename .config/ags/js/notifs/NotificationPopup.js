// This is taken from the examples
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { lookUpIcon } from "resource:///com/github/Aylur/ags/utils.js";

/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */
const NotificationIcon = ({ app_entry, app_icon, image }) => {
  print(image);

  if (image) {
    return Widget.Box({
      css: `
                background-image: url("${image}");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            `,
    });
  }

  let icon = "dialog-information-symbolic";
  if (lookUpIcon(app_icon)) icon = app_icon;

  if (app_entry && lookUpIcon(app_entry)) icon = app_entry;

  return Widget.Icon(icon);
};

/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */
const Notification = (n) => {
  const icon = Widget.Box({
    vpack: "center",
    class_name: "icon",
    children: [NotificationIcon(n)],
  });

  const title = Widget.Label({
    class_name: "title",
    xalign: 0,
    justification: "left",
    hexpand: true,
    max_width_chars: 24,
    truncate: "end",
    wrap: true,
    label: n.summary,
    use_markup: true,
  });

  const body = Widget.Label({
    class_name: "body",
    hexpand: true,
    use_markup: true,
    xalign: 0,
    justification: "left",
    label: n.body,
    wrap: true,
  });

  const actions = Widget.Box({
    class_name: "actions",
    children: n.actions.map(({ id, label }) =>
      Widget.Button({
        class_name: "action-button",
        on_clicked: () => n.invoke(id),
        hexpand: true,
        child: Widget.Label(label),
      }),
    ),
  });

  return Widget.EventBox({
    on_primary_click: () => n.dismiss(),
    child: Widget.Box({
      class_name: `notification ${n.urgency}`,
      vertical: true,
      children: [
        Widget.Box({
          children: [
            icon,
            Widget.Box({
              vertical: true,
              spacing: 2,
              children: [title, body],
            }),
          ],
        }),
        actions,
      ],
    }),
  });
};

export const NotificationPopup = Widget.Window({
  name: "notifications",
  class_name: "notif-window",
  anchor: ["top"],
  // margins: [4, 4, 0],
  child: Widget.Box({
    class_name: "notifications",
    vertical: true,
    children: Notifications.bind("popups").as((popups) => {
      return popups.map(Notification);
    }),
  }),
});
