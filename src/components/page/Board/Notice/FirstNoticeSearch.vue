<template>
  <div class="search-box">
    <input v-model.lazy="keyword" />
    <input type="date" v-model="searchStartDate" />
    <input type="date" v-model="searchEndDate" />
    <button @click="handlerSearch">검색</button>
    <button @click="handlerModal">신규등록</button>
  </div>
</template>
<script setup>
import { useModalStore } from "../../../../stores/modalState";
import router from "@/router";
const keyword = ref(""); // ref - 값이 변경되면 화면이 재렌더링
const searchStDate = ref("");
const searchEdDate = ref("");
const modal = useModalStore();

//keyword 값이 변경 될 때마다 (state변경) 이하의 함수가 실행된다.
// watch(keyword, () => {
//   //keyword 자리에는 반응형객체(ref) 포함된 값이들어가야함
//   console.log(keyword.value); //키워드 값을 직접적으로 관리하고싶을 땐 .value
// });

const handlerSearch = () => {
  const query = [];
  !keyword.value || query.push(`searchTitle=${keyword.value}`);
  !searchStDate.value || query.push(`searchStDate=${searchStDate.value}`);
  !searchEdDate.value || query.push(`searchEdDate=${searchEdDate.value}`);
  const queryString = query.length > 0 ? `?${query.join("&")}` : ""; //url 뒤에 붙이기위한 string

  router.push(queryString);
};

// 인자로 받는 함수안에 반응형 객체 (ref 같은거)가 있으면, 객체가 변경 도리 때 마다, 해당 함수를 실행 시켜줌
// 근데 ,  밑에 watchEffect는 ref같은거 없어요. 그래서 그냥 새로고침 누르면 최초에 한번 실행되는 것입니다.
watchEffect(() => window.location.search && router.push(window.location.posthname, { replace: ture }));

const handlerModal = () => {
  modal.setModalState();
};
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
  display: block;
  float: inline-end;
}

input {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
  width: 70px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  background-color: #3bb2ea;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>
