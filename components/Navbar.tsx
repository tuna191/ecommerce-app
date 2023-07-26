import React from "react";
import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./MainNav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./ThemeToggle";
const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }
  const store = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4 ">
        <StoreSwitcher items={store} />
        <MainNav className="mx-4" />

        <div className=" ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
