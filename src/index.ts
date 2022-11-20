import "./style.css";

function onload({ extensionAPI }: { extensionAPI: RoamExtensionAPI }) {
  extensionAPI.settings.panel.create({
    tabTitle: "Roam \"Native\" Dark",
    settings: [
      {
        id: "enabled",
        name: "Mode",
        action: {
          type: "select",
          items: ["dark", "light"],
          onChange: (evt: string) => {
            console.log("Select Changed!", evt);
            if (evt === "light") {
              document.body.classList.remove("bp3-dark");
            } else if (evt === "dark") {
              document.body.classList.add("bp3-dark");
            } else {
              
            }
          },
        },
      },
    ],
  });
  if (extensionAPI.settings.get('enabled') !== 'light') {
    document.body.classList.add("bp3-dark");
  }
}

function onunload() {
  document.body.classList.remove("bp3-dark");
}

export default {
  onload,
  onunload,
};
