import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import sharedGetStaticProps from "~/components/Document/lib/sharedGetStaticProps";
import DocumentPageLayout from "~/components/Document/pages/DocumentPageLayout";
import { useRouter } from "next/router";
import { Post } from "~/components/Document/lib/types";
import { captureEvent } from "~/config/utils/events";
import Error from "next/error";
import config from "~/components/Document/lib/config";
import { StyleSheet, css } from "aphrodite";
import DocumentPagePlaceholder from "~/components/Document/lib/Placeholders/DocumentPagePlaceholder";
import { useEffect, useRef, useState } from "react";
import {
  useDocument,
  useDocumentMetadata,
} from "~/components/Document/lib/useHooks";
import { DocumentContext } from "~/components/Document/lib/DocumentContext";
import dynamic from "next/dynamic";
const DynamicCKEditor = dynamic(
  () => import("~/components/CKEditor/SimpleEditor")
);
import removeMd from "remove-markdown";
import API from "~/config/api";
import { Helpers } from "@quantfive/js-web-config";
import Button from "~/components/Form/Button";
import {
  LEFT_SIDEBAR_MAX_WIDTH,
  LEFT_SIDEBAR_MIN_WIDTH,
} from "~/components/Home/sidebar/RootLeftSidebar";
import { breakpoints } from "~/config/themes/screen";
// import AnnotationLayer from "~/components/Comment/modules/annotation/AnnotationLayer";

const savePostApi = ({ id, postHtml }) => {
  const _toPlaintext = (text) => {
    return removeMd(text).replace(/&nbsp;/g, " ");
  };

  const params = {
    post_id: id,
    full_src: postHtml,
    renderable_text: _toPlaintext(postHtml),
  };

  return fetch(API.RESEARCHHUB_POST({}), API.POST_CONFIG(params))
    .then(Helpers.checkStatus)
    .then(Helpers.parseJSON)
    .catch((error) => {
      alert("Something went wrong. Please try again later.");
    });
};

interface Args {
  documentData?: any;
  metadata?: any;
  postHtml?: TrustedHTML | string;
  errorCode?: number;
}

const DocumentIndexPage: NextPage<Args> = ({
  documentData,
  metadata,
  postHtml = "",
  errorCode,
}) => {
  const documentType = "post";
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [viewerWidth, setViewerWidth] = useState<number | undefined>(
    config.width
  );
  const [_postHtml, setPostHtml] = useState<TrustedHTML | string>(postHtml);
  const [documentMetadata, setDocumentMetadata] = useDocumentMetadata({
    rawMetadata: metadata,
    unifiedDocumentId: documentData?.unified_document?.id,
  });
  const [document, setDocument] = useDocument({
    rawDocumentData: documentData,
    documentType,
  }) as [Post | null, Function];
  const contentRef = useRef(null);

  useEffect(() => {
    setPostHtml(postHtml);
  }, [postHtml]);

  if (router.isFallback) {
    return <DocumentPagePlaceholder />;
  }
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!document || !documentMetadata) {
    captureEvent({
      msg: "[Document] Could not parse",
      data: { document, documentType, documentMetadata },
    });
    return <Error statusCode={500} />;
  }

  return (
    <div>
      <DocumentContext.Provider
        value={{
          metadata: documentMetadata,
          documentType,
          updateDocument: () => null,
          updateMetadata: setDocumentMetadata,
          editDocument: () => {
            // Post
            if (document.note) {
              router.push(
                `/${document.note.organization.slug}/notebook/${document.note.id}`
              );
            }
            // Question
            else {
              setIsEditing(true);
            }
          },
        }}
      >
        <DocumentPageLayout
          document={document}
          errorCode={errorCode}
          metadata={documentMetadata}
          documentType={documentType}
        >
          <div
            className={css(styles.bodyContentWrapper)}
            style={{ width: viewerWidth }}
          >
            <div className={css(styles.bodyWrapper)}>
              {isEditing ? (
                <div className={css(styles.editor)}>
                  <DynamicCKEditor
                    editing
                    id="editPostBody"
                    initialData={_postHtml}
                    noTitle={true}
                    onChange={(id, editorData) => setPostHtml(editorData)}
                    readOnly={false}
                  />

                  <div className={css(styles.editButtonRow)}>
                    <Button
                      isWhite
                      variant={"text"}
                      label={"Cancel"}
                      onClick={(): void => setIsEditing(false)}
                      size={"small"}
                    />
                    <Button
                      variant={"contained"}
                      label={"Save"}
                      onClick={(): void => {
                        savePostApi({ id: document.id, postHtml: _postHtml });
                        setIsEditing(false);
                      }}
                      size={"small"}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  {/* <AnnotationLayer
                    document={document}
                    contentRef={contentRef}
                  /> */}
                  <div
                    ref={contentRef}
                    className={css(styles.body) + " rh-post"}
                    dangerouslySetInnerHTML={{ __html: _postHtml }}
                  />
                </div>
              )}
            </div>
          </div>
        </DocumentPageLayout>
      </DocumentContext.Provider>
    </div>
  );
};

const styles = StyleSheet.create({
  bodyWrapper: {
    borderRadius: "4px",
    border: `1px solid ${config.border}`,
    marginTop: 15,
    background: "white",
    width: "100%",
    boxSizing: "border-box",
  },
  body: {
    padding: 45,
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      padding: 15,
    },
  },
  editor: {
    padding: 45,
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      padding: 15,
    },
  },
  bodyContentWrapper: {
    margin: "0 auto",
    maxWidth: `calc(100vw - ${LEFT_SIDEBAR_MAX_WIDTH}px)`,
    [`@media only screen and (max-width: ${breakpoints.large.str})`]: {
      maxWidth: `calc(100vw - ${LEFT_SIDEBAR_MIN_WIDTH + 40}px)`,
    },
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      maxWidth: `calc(100vw - 30px)`,
    },
  },
  editButtonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    columnGap: "15px",
  },
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  return sharedGetStaticProps({ ctx, documentType: "post" });
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default DocumentIndexPage;
