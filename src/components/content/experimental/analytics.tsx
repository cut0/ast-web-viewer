import { FC, useContext, useMemo, useState } from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import Link from "next/link";
import Image from "next/image";
import { ExperimentalCodeContext } from "../../../features/experimental/CodeProvider";
import { ConfirmModalContainer } from "../../common/ConfirmModalContainer";
import {
  NotFoundPageContainer,
  PageContainer,
  TreeViewerContainer,
  LinkButton,
  Header,
  ProfileImageContainer,
  SubmitCodeButton,
} from "./analytics.css";

export const ExperimentalAnalyticsPageContent: FC = () => {
  const [nodeList] = useContext(ExperimentalCodeContext);
  const rawNodeDatum: RawNodeDatum | undefined = useMemo(() => {
    const baseNodeList: Required<RawNodeDatum>[] = nodeList.payload.map(
      (node) => {
        return {
          name: node.type,
          attributes: {
            id: node.id,
            parentId: node.parentId ?? "",
            value: node.specificValue ?? "",
          },
          children: [] as RawNodeDatum[],
        };
      },
    );

    while (true) {
      const targetNode = baseNodeList.pop();
      if (targetNode === undefined || targetNode.attributes.parentId === "") {
        return targetNode;
      }
      baseNodeList.map((node) => {
        if (node.attributes.id !== targetNode.attributes.parentId) {
          return node;
        }
        node.children.push(targetNode);
        return node;
      });
    }
  }, [nodeList]);

  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(true);
  const [showLogOutConfirmModal, setShowLogOutConfirmModal] = useState(true);

  return (
    <>
      {rawNodeDatum === undefined ? (
        <div className={NotFoundPageContainer}>
          <p>
            データがありません。 探索ページに
            <Link href="/experimental" passHref>
              <a className={LinkButton}>戻る</a>
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className={PageContainer}>
            <header className={Header}>
              <button className={ProfileImageContainer}></button>
              <button className={SubmitCodeButton} type="button">
                Submit
              </button>
            </header>
            <div className={TreeViewerContainer}>
              <Tree data={rawNodeDatum} />
            </div>
          </div>
          <ConfirmModalContainer
            isOpen={showSubmitConfirmModal}
            onClickAccept={() => {
              setShowSubmitConfirmModal(false);
            }}
            onClickCancel={() => {
              setShowSubmitConfirmModal(false);
            }}
          >
            <p>ログを登録しますか？</p>
          </ConfirmModalContainer>
          <ConfirmModalContainer
            isOpen={showLogOutConfirmModal}
            onClickAccept={() => {
              setShowLogOutConfirmModal(false);
            }}
            onClickCancel={() => {
              setShowLogOutConfirmModal(false);
            }}
          >
            <p>ログアウトしますか？</p>
          </ConfirmModalContainer>
        </>
      )}
    </>
  );
};
