import { PromiseClient, createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { ServiceType } from "@bufbuild/protobuf";
import { Accessor, createMemo } from "solid-js";

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
