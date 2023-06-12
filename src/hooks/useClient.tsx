import { Accessor, createMemo } from "solid-js";
import { createConnectTransport } from "@bufbuild/connect-web";
import { PromiseClient, createPromiseClient } from "@bufbuild/connect";
import { ServiceType } from "@bufbuild/protobuf";

const transport = createConnectTransport({
  baseUrl: "http://localhost:4000", //TODO: use env (infisical)
  useBinaryFormat: true,
  credentials: "include"
});

export function useClient<T extends ServiceType>(
  service: T,
): Accessor<PromiseClient<T>> {
  return createMemo(() => createPromiseClient(service, transport));
}
