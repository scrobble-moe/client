import type { ServiceType } from "@bufbuild/protobuf";
import { type PromiseClient, createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { type Accessor, createMemo } from "solid-js";

const transport = createConnectTransport({
  baseUrl: `http://${import.meta.env.VITE_RPC_URL}`,
  useBinaryFormat: true,
  credentials: "include",
});

export function useClient<T extends ServiceType>(
  service: T,
): Accessor<PromiseClient<T>> {
  return createMemo(() => createPromiseClient(service, transport));
}
