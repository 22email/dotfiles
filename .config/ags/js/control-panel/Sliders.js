import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { speakerIcon, microphoneIcon } from "../Variables.js";


// TODO: brightness? (prolly not)


/** @param {'speaker' | 'microphone'} type */
const AudioSlider = (type = "speaker") =>
  Widget.Box({
    spacing: 8, 
    css: "min-width: 180px",
    class_name: `audio-slider ${type}`,
    children: [
      Widget.Icon({ class_name: "icon" }).hook(
        Audio,
        (self) => {
          if (!Audio[type]) return;
          self.icon = type === "speaker" ? speakerIcon() : microphoneIcon();
        },
        `${type}-changed`,
      ),
      Widget.Label().hook(
        Audio,
        (self) => {
          let muted = Audio[type].stream?.is_muted;
          self.toggleClassName("muted", muted);
          self.label = muted
            ? "Muted"
            : `${Math.round(Audio[type].volume * 100)}%`;
        },
        `${type}-changed`,
      ),
      Widget.Slider({
        hexpand: true,
        draw_value: false,
        on_change: ({ value }) => (Audio[type].volume = value),
        setup: (self) =>
          self.hook(Audio[type], () => {
            self.value = Audio[type].volume || 0;
          }),
      }),
    ],
  });

export const Speaker = () => AudioSlider("speaker");
export const Microphone = () => AudioSlider("microphone");
