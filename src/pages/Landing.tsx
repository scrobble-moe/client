import { Motion } from "@motionone/solid";
import { A } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import { TextButton } from "./UI.jsx";

export const Landing: Component = () => {
  return (
    <div class="flex flex-col m-auto gap-8">
      <div class="flex mx-auto gap-8">
        <img
          src="/plex-logo-full-color-on-white.svg"
          class="h-24 my-auto"
          alt="Plex"
        />
        <div class="my-auto">
          <Logo />
        </div>
      </div>
      <A href="/auth/redirect" class="mx-auto">
        <TextButton>Sign In with Plex</TextButton>
      </A>
    </div>
  );
};

const Logo: Component = () => {
  const [activeLogo, setActiveLogo] = createSignal<"anilist" | "kitsu">(
    "anilist",
  );

  createEffect(() => {
    //toggle between logos
    const interval = setInterval(() => {
      setActiveLogo((prev) => (prev === "anilist" ? "kitsu" : "anilist"));
    }, 5000);
  });

  return (
    <Motion.div
      animate={{
        backgroundColor: activeLogo() === "anilist" ? "#2b2d42" : "#2d212d",
        transitionDuration: "2s",
      }}
      class="flex w-28 h-28 rounded-lg relative"
    >
      <Motion.img
        animate={{
          opacity: activeLogo() === "anilist" ? 1 : 0,
          transitionDuration: "2s",
        }}
        src="/AniList.svg"
        class="h-24 m-auto absolute inset-0"
        alt="AniList"
      />
      <Motion.img
        animate={{
          opacity: activeLogo() === "kitsu" ? 1 : 0,
          transitionDuration: "2s",
        }}
        src="/Kitsu.svg"
        class="h-24 p-2 m-auto absolute inset-0"
        alt="Kitsu"
      />
    </Motion.div>
  );
};
