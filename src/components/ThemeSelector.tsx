import { Monitor, Moon, Sun } from "lucide-react";
import type { ComponentPropsWithRef } from "react";
import { useTheme } from "./providers/ThemeProvider";
import { Button } from "./ui/Button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "./ui/Menu";

type Props = Omit<ComponentPropsWithRef<"button">, "onClick">;
export function ThemeSelector({ ...props }: Props) {
  const { theme, setTheme } = useTheme();
  const themes = [
    { label: "Light", value: "light" as const },
    { label: "Dark", value: "dark" as const },
    { label: "System", value: "system" as const },
  ];
  return (
    <Menu>
      <MenuTrigger render={<Button {...props} />}>
        {theme === "light" ? <Sun /> : null}
        {theme === "dark" ? <Moon /> : null}
        {theme === "system" ? <Monitor /> : null}
      </MenuTrigger>

      <MenuContent>
        {themes.map(({ label, value }) => (
          <MenuItem key={value} onClick={() => setTheme(value)}>
            {label}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  );
}
