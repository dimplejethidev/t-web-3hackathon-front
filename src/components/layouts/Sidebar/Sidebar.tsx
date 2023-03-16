import { SidebarButtons } from "@/src/features/sidebar";
import clsx from "clsx";

/**
 * サイドバー
 * @layout
 * @author keit
 */
export const Sidebar = () => {
  return (
    <SidebarButtons className={clsx("hidden", "md:flex", "flex-col", "mx-6")} />
  );
};
