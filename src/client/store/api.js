/* 封装对后端的路由请求 */
import axios from 'axios'

export function getFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export function postFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export function deleteFetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export default {
    addCollection(params) { // 新增收藏
        return postFetch('/api/addCollection', params);
    },
    addCollectionD(params) { // 新增收藏
        return postFetch('/api/addCollectionDetail', params);
    },
    getCollection(params) { // 获取收藏
        return getFetch('/api/getCollection', params);
    },
    updateCollection(params) { // 更新收藏
        return postFetch('/api/updateCollection', params);
    },
    delCollection(params) { // 获取收藏
        return postFetch('/api/delCollection', params);
    },

    getAllShops(params) { // 获取商家
        return getFetch('/api/getAllShops', params);
    },

    addOrder(params) { // 生成订单
        return postFetch('/api/addOrder', params);
    },
    getOrders(params) { // 生成订单
        return getFetch('/api/getOrders', params);
    },


    addComment(params) { // 新增评论
        return postFetch('/api/addComment', params);
    },

    uploadTravel(params) { // 游记发布
        return postFetch('/api/uploadTravel', params);
    },

    getNotravels(params) { // 获取未旅游游记
        return getFetch('/api/getNotravels', params);
    },

    getNotravelOrder(params) { // 获取未旅游游记内的订单
        return getFetch('/api/getNotravelOrder', params);
    },


    getComments(params) { // 商家详情页，获取评论
        return getFetch('/api/getComments', params);
    }

}