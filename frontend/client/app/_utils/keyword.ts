import { Keyword } from "../_apis/detail-page/index.type";



export const filterGroup =["분야", "직무", "목적", "고유"];

export const keywordByGroup = (data: Keyword[] | undefined) => {
  if(!data) return []
  return data.filter(item => filterGroup.includes(item.keyword_group_name));
}

export const keywordByGroupExclude = (data: Keyword[] | undefined) => {
  if(!data) return []
  
  return data.filter(item => !filterGroup.includes(item.keyword_group_name));
}

export const isField = (data: Keyword) => {
  return data?.keyword_group_name === "분야"
}

const dummy = {
  keyword_id: 0,
  keyword_group_id: 0,
  keyword_name: "",
  keyword_group_name: ""
}

export const getField = (data: Keyword[] | undefined): Keyword => {
  if(!data) return dummy

  return data.find(item => item.keyword_group_name === "분야") || dummy
}