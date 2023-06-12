import { createSignal, Component, JSXElement } from "solid-js";

interface AsyncIterableConsumerProps<T> {
  asyncIterable: AsyncIterable<T>;
  children: (items: T[]) => JSXElement;
}

export const AsyncIterableConsumer: Component<
  AsyncIterableConsumerProps<unknown>
> = <T,>(props: AsyncIterableConsumerProps<T>) => {
  const [items, setItems] = createSignal<T[]>([]);

  (async () => {
    for await (const item of props.asyncIterable) {
      setItems((prevItems) => [...prevItems, item]);
    }
  })();

  return props.children(items());
};
