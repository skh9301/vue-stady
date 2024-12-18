import axios from "axios";
import { Notice } from "../api";

export const noticeDetailInsertApi = async (detailValue, loginId) => {
  const textData = {
    title: detailValue.title,
    context: detailValue.content,
    loginId: loginId,
  };
  console.log("여기는 api", detailValue);
  console.log("여기는 api", textData);
  await axios.post(Notice.NoticeInsert, textData);
};
