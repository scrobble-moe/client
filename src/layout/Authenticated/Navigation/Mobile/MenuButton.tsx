import { ListIcon } from "solid-phosphor/regular";
import { Component, Setter } from "solid-js";

export interface MenuButtonProps {
  setMobileMenuOpen: Setter<boolean>;
}

export const MenuButton: Component<MenuButtonProps> = (props) => {
  return (
    <div class="absolute right-0 flex-shrink-0 lg:hidden">
      {/* Mobile menu button */}
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <ListIcon onClick={() => props.setMobileMenuOpen(true)} class="block" />
      </button>
    </div>
  );
};
