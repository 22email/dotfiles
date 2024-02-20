import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";

const increaseVolume = () => {
  if (Audio.speaker.volume + 0.02 >= 1.2) return;
  Audio.speaker.volume += 0.02;
};
export const Volume = () =>
  Widget.Button({
    class_name: "volume",
    onScrollUp: increaseVolume,
    onScrollDown: () => (Audio.speaker.volume -= 0.02), // Lower end of volume caps out at 0; no need for utility function
    on_primary_click: () => execAsync("pavucontrol"),
    on_secondary_click: () => Audio.speaker.is_muted = !Audio.speaker.is_muted,
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
