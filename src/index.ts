import "./style.css";

function onload({ extensionAPI }: { extensionAPI: RoamExtensionAPI }) {
  extensionAPI.settings.panel.create([
    {
      id: "enabled",
      name: "Modifier",
      action: {
        type: "switch",
        callback(arg) {
          console.log(arg);
        },
      },
    },
  ]);
  document.body.classList.add("bp3-dark");
}

function onunload() {
  document.body.classList.remove("bp3-dark");
}

export default {
  onload,
  onunload,
};
