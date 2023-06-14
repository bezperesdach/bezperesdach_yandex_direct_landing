import { createContextId } from "@builder.io/qwik";

export const themeContext = createContextId<{ theme: string; themes: string[] }>("light");
