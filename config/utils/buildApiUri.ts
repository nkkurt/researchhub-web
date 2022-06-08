import { getApiRootURI } from "~/config/utils/getApiRootURI";

export function buildApiUri({ apiPath }: { apiPath: string }): string {
  return `http://${getApiRootURI()}/api/${apiPath}/`;
}
