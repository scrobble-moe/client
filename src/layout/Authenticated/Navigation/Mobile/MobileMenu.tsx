import { GrapeIcon, XIcon } from "lucide-solid";
import { Accessor, Component, Setter } from "solid-js";
import { NavLink } from "./NavLink.js";
import { Popover } from "@kobalte/core";

export interface MobileNavProps {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
}

export const MobileMenu: Component<MobileNavProps> = (props) => {
  return (
    <Popover.Root open={props.open()} onOpenChange={props.setOpen}>
      <Popover.Portal>
        {/* <Popover.Content> */}
        // {/* Mobile menu, show/hide based on mobile menu state. */}
        <div class="lg:hidden">
          {/* */}
          {/* Mobile menu overlay, show/hide based on mobile menu state.

    Entering: "duration-150 ease-out"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "duration-150 ease-in"
      From: "opacity-100"
      To: "opacity-0"
  */}
          <div class="fixed inset-0 z-20 bg-black bg-opacity-25" />

          {/* Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-150 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-150 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  */}
          <div class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition">
            <div class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="pb-2 pt-3">
                <div class="flex items-center justify-between px-4">
                  <GrapeIcon class="text-fuchsia-700" />
                  <div class="-mr-2">
                    <button
                      onClick={() => props.setOpen(false)}
                      type="button"
                      class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <XIcon />
                    </button>
                  </div>
                </div>
                <div class="mt-3 space-y-1 px-2">
                  <NavLink href="/dashboard">Home</NavLink>
                  <NavLink href="/auth/redirect">Redirect</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </Popover.Content> */}
      </Popover.Portal>
    </Popover.Root>
  );
};
