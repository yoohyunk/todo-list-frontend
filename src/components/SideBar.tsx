import { getAlllists } from "@/actions/list";

import { SidebarContent } from "./SidBarContent";

export default async function SideBar() {
  const lists = await getAlllists();

  return (
    <div className="">
      <SidebarContent lists={lists} />
    </div>
  );
}
