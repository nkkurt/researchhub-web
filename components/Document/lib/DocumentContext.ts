import { createContext } from "react";
import { DocumentMetadata, DocumentType } from "./types";

type DocumentContext = {
  metadata: DocumentMetadata | undefined;
  documentType: DocumentType | undefined;
  tabName?: string | undefined;
  updateMetadata: Function;
};

export const DocumentContext = createContext<DocumentContext>({
  metadata: undefined,
  documentType: undefined,
  tabName: undefined,
  updateMetadata: Function,
});
