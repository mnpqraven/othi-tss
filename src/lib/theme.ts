import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { type } from "arktype";

type Theme = "dark" | "light";

const storageKey = "ui-theme";

export const getThemeServerFn = createServerFn().handler(async () => {
  return (getCookie(storageKey) || "dark") as Theme;
});

export const setThemeServerFn = createServerFn({ method: "POST" })
  .inputValidator(type("'light' | 'dark' | 'system'"))
  .handler(async ({ data }) => {
    setCookie(storageKey, data);
  });
