import axios from '../request';
import qs from 'qs';

// const baseURL = 'http://localhost:3000'

export function addCata(obj) {
  let data = qs.stringify(obj);;
  return axios({
    method: 'post',
    url: '/cata/addCata',
    data: data
  })
}

export function getAllCata() {
  return axios.get(`/cata/getAllCata`);
}

export function editCataTitle(obj) {
  let data = qs.stringify(obj);
  return axios({
    method: 'put',
    url: '/cata/editCataTitle',
    data: data
  })
}

export function editCataLocation(obj) {
  let data = qs.stringify(obj);
  return axios({
    method: 'put',
    url: '/cata/editCataLocation',
    data: data
  })
}

export function delCataByArr(arr) {
  let obj = {
    cidArr: arr
  };
  //这里是json化 不是qs化
  let data = JSON.stringify(obj);
  return axios({
    method: 'delete',
    url: '/cata/delCata',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

