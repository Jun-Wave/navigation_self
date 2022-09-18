import axios from '../request';
import qs from 'qs';


// const baseURL = 'http://localhost:3000'


/**
 * @param {cid所属目录id,uid所属用户id,title网址名称,introduce介绍,url网址链接} obj 
 * @returns 
 */
export function addNav(obj) {
  const data = qs.stringify(obj);;
  return axios({
    method: 'post',
    url: '/nav/addNav',
    data: data
  })
}

export function addShareNav(obj) {
  const data = qs.stringify(obj);;
  return axios({
    method: 'post',
    url: '/nav/addShareNav',
    data: data
  })
}
/**
 * @param {img图片文件, cid所属目录id, uid所属用户id, title网址名称, introduce介绍, url网址链接} obj 
 * @returns 
 */
 export function addNavAndImg(obj) {
  let data = new FormData();//创建formData对象
  data.append('img', obj.img);
  data.append('cid',obj.cid);
  data.append('title',obj.title);
  data.append('introduce', obj.introduce);
  data.append('url',obj.url);
  return axios({
    method: 'post',
    url: '/nav/addNavAndImg',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}
/**
 * @param {所属目录id} cid 
 * @returns 
 */
export function getAllNav(cid) {
  return axios.get(`/nav/getAllNav?cid=${cid}`);
}

/**
 * @param {nid网址id,title网址名称,introduce介绍,url网址链接} obj 
 * @returns 
 */
export function editNav(obj) {
  const data = qs.stringify(obj);
  return axios({
    method: 'put',
    url: '/nav/editNav',
    data: data
  })
}

/**
 * @param {nid网址id,img图片文件} obj 
 * @returns 
 */
 export function editNavImg(obj) {
  let data = new FormData();//创建formData对象
  data.append('img', obj.img);
  data.append('nid',obj.nid);
  return axios({
    method: 'put',
    url: '/nav/editNavImg',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

export function editNavLocation(obj) {
  let data = qs.stringify(obj);
  return axios({
    method: 'put',
    url: '/nav/editNavLocation',
    data: data
  })
}



/**
 * @param {[nid,nid……]要删除nid} arr 
 * @returns 
 */
export function delNavByArr(arr) {
  let obj = {
    nidArr: arr
  }
  //这里是json字符化 不是qs化
  let data = JSON.stringify(obj);
  return axios({
    method: 'delete',
    url: '/nav/delNav',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}
