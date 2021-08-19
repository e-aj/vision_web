import request from "../api/index"

export function getData(url) {
    return request({
        method: "get",
        url: url,
    })

}