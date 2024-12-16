<template>
  <div class="divNoticeList">
    <!-- <NoticeModal></NoticeModal> -->
    현재 페이지: {{ cPage }} 총 개수: {{ noticeList?.noticeCnt }}
    <table>
      <colgroup>
        <col width="10%" />
        <col width="50%" />
        <col width="30%" />
        <col width="10%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="noticeList">
          <template v-if="noticeList.noticeCnt > 0">
            <!-- key를 만드는 이유: 고유한 값을 부여해  비효율적인 랜더링을 방지-->
            <!-- key가 없으면 Vue는 리스트 항목을 재사용하면서 같은 컴포넌트를 계속 재활용하려 합니다. -->
            <!-- key가 있으면 항목 간 고유 식별자로 작동해, Vue가 정확히 어떤 항목이 추가, 삭제, 또는 재정렬되었는지 알 수 있습니다. -->
            <tr v-for="notice in noticeList.notice" :key="notice.noticeIdx">
              <td scope="col">{{ notice.noticeIdx }}</td>
              <td scope="col">{{ notice.title }}</td>
              <td scope="col">{{ notice.createdDate.substr(0, 10) }}</td>
              <td scope="col">{{ notice.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <Pagination
      :totalItems="noticeList?.noticeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Pagination from "../../../common/Pagination.vue";

const route = useRoute();
const noticeList = ref();
const cPage = ref(1);

const searchList = () => {
  const param = new URLSearchParams({
    searchTitle: route.query.searchTitle || "",
    searchStDate: route.query.searchStDate || "",
    searchEdDate: route.query.searchEdDate || "",
    currentPage: cPage.value,
    pageSize: 5,
  });
  axios.post("/api/board/noticeListJson.do", param).then((res) => {
    noticeList.value = res.data;
  });
};

watch(route, searchList);
//초기에 화면이 열렸을 때
onMounted(() => {
  searchList();
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #2676bf;
    color: #ddd;
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
