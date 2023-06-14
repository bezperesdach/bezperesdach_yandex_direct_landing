export const DarkThemeLauncher = () => (
  <script
    dangerouslySetInnerHTML={`if (localStorage.theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (localStorage.theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else if (typeof localStorage.theme === "undefined") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) { document.documentElement.setAttribute("data-theme", "dark"); } else { document.documentElement.setAttribute("data-theme", "light"); }
    }`}
  />
);
