import { SearchIcon } from "lucide-solid";
import { Component, JSX, createSignal } from "solid-js";
import { SearchBar } from "./Searchbar.jsx";
import { MenuButton } from "./MenuButton.jsx";

export const MobileNav: Component = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
  return (
    <>
      <SearchBar />

      <MenuButton setMobileMenuOpen={setMobileMenuOpen} />
    </>
  );
};
