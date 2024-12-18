import axios from "axios";
import { Notice } from "../api";

export const noticeDetailUpdateApi = async (detailValue, idx) => {
  const textData = {
    ...detailValue,
    noticeSeq: idx,
    context: detailValue.content,
  };
  console.log("여기는 noticeDetailUpdateApi");
  await axios.post(Notice.NoticeUpdate, textData);
};
