//分装文章相关的接口
import {request} from "@/utils";

export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

export function createArticleAPI(data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

export function getArticleListAPI(params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export function deleteArticleAPI(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE'
  })
}

export function getArticleById(id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'GET'
  })
}

export function updateArticleAPI(data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}