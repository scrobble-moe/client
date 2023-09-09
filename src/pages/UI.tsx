import { Motion } from "@motionone/solid";
import { Component, For, JSX, JSXElement } from "solid-js";

export const UI: Component = () => {
  const anime = [
    {
      title: "Watashi no Shiawase na Kekkon",
      status: "Watching",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx147103-Om2LOXlhHNAe.png",
    },
    {
      title: "Mushoku Tensei II: Isekai Ittara Honki Dasu",
      status: "Watching",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx146065-1hTpwsW2fQIA.jpg",
    },
    {
      title: "Dark Gathering",
      status: "Watching",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx152802-qpOnEtQDbppP.jpg",
    },
    {
      title: "Masamune-kun no Revenge R",
      status: "Watching",
      image:
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx146953-80YtZNkpbhIA.jpg",
    },
  ];

  return (
    <div class="h-full w-full">
      <div class="flex antialiased p-8">
        <div class="flex flex-wrap gap-3">
          {anime.map((item) => (
            <AnimeCard title={item.title} image={item.image} />
          ))}
        </div>
        // Popup Component
        <div class="bg-two rounded-xl w-96 overflow-hidden drop-shadow-md select-none flex flex-col">
          <div class="flex justify-between p-4">
            <div class="my-auto">Header</div>
            <div class="flex gap-3 my-auto">
              <Button>f</Button>
              <Button>f</Button>
            </div>
          </div>
          <div class="bg-three p-4 h-full flex flex-col">
            Body
            <div class="mt-auto">
              <Histogram
                data={[
                  1, 8, 3, 5, 7, 3, 1, 8, 7, 4, 2, 4, 1, 4, 2, 8, 7, 5, 5, 3, 6,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface AnimeCardProps {
  title: string;
  image: string;
}
export const AnimeCard: Component<AnimeCardProps> = (props) => {
  return (
    <div class="flex-1 rounded-xl w-48 bg-two drop-shadow-md cursor-pointer select-none">
      <Motion.img
        hover={{
          scale: 1.05,
        }}
        src={props.image}
        class="rounded-xl drop-shadow-md"
        alt={props.title}
      />
      <div class="p-2">
        <h3 class="truncate font-semibold">{props.title}</h3>
        //some status
      </div>
    </div>
  );
};

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSXElement;
}

export const Button: Component<ButtonProps> = (props) => {
  return (
    <Motion.button
      hover={{
        scale: 1.05,
      }}
      press={{
        scale: 0.95,
      }}
      type="button"
      class="flex items-center justify-center rounded-xl h-12 w-12 bg-three text-gray-900 drop-shadow-md"
    >
      {props.children}
    </Motion.button>
  );
};

export interface CardProps {
  title: string;
  children: JSXElement;
}

export const Card: Component<CardProps> = (props) => {
  return (
    <div class="bg-two rounded-xl w-96 overflow-hidden drop-shadow-md select-none flex flex-col m-auto">
      <div class="flex justify-between p-4">
        <div class="my-auto">{props.title}</div>
        <div class="flex gap-3 my-auto">
          <Button>f</Button>
          <Button>f</Button>
        </div>
      </div>
      <div class="bg-three p-4 h-full flex flex-col">{props.children}</div>
    </div>
  );
};

export interface HistogramProps {
  data: number[];
}

const Histogram: Component<HistogramProps> = (props) => {
  const { data } = props;

  const max = Math.max(...data) + 1;
  const min = Math.min(...data) - 1;
  const range = max - min;

  const points = data.map((item) => {
    return ((item - min) / range) * 100;
  });

  console.log(points);

  return (
    <div class="flex h-24 items-end gap-1">
      <For each={points}>
        {(item) => (
          <Motion.div
            hover={{
              backgroundColor: "#ffddae",
            }}
            class="h-4 bg-one rounded-xl w-4 shadow"
            style={{ height: `${item}%` }}
          />
        )}
      </For>
    </div>
  );
};

export interface TextButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSXElement;
}

export const TextButton: Component<TextButtonProps> = (props) => {
  return (
    <Motion.button
      hover={{
        scale: 1.05,
      }}
      press={{
        scale: 0.95,
      }}
      type="button"
      class="flex items-center justify-center rounded-xl h-12 px-3 bg-three text-textOne drop-shadow-md"
      {...props}
    />
  );
};
