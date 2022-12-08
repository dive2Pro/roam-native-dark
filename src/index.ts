import "./style.css";

const supportMatchMedia = !!window.matchMedia;

let matchMediaInstance = supportMatchMedia
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : ({
      addEventListener: (
        key: string,
        callback: (arg: MediaQueryListEvent) => void
      ) => {},
    } as MediaQueryList);

const sub = () => {
  matchMediaInstance.addEventListener("change", handleThemeChange);
};

const unsub = () => {
  matchMediaInstance.removeEventListener("change", handleThemeChange);
};

const items = supportMatchMedia ? ["dark", "light", "auto"] : ["dark", "light"];

const handleThemeChange = (event: MediaQueryListEvent) => {
  const newColorScheme = event.matches ? "dark" : "light";
  changeTheme(newColorScheme);
  console.log("Theme Change");
};
const changeTheme = (theme: string) => {
  if (theme === "light") {
    document.body.classList.remove("bp3-dark");
  } else if (theme === "dark") {
    document.body.classList.add("bp3-dark");
  }
};
const onThemeChange = (theme: string) => {
  unsub();
  if (theme === "auto") {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    changeTheme(dark ? "dark" : "light");
    sub();
    return;
  }
  changeTheme(theme);
};

function onload({ extensionAPI }: { extensionAPI: RoamExtensionAPI }) {
  extensionAPI.settings.panel.create({
    tabTitle: 'Roam "Native" Dark',
    settings: [
      {
        id: "enabled",
        name: "Mode",
        action: {
          type: "select",
          items,
          onChange: onThemeChange,
        },
      },
    ],
  });

  if (extensionAPI.settings.get("enabled")) {
    onThemeChange(extensionAPI.settings.get("enabled") as string);
  } else {
    onThemeChange("dark");
  }
}

function onunload() {
  document.body.classList.remove("bp3-dark");
}

export default {
  onload,
  onunload,
};
