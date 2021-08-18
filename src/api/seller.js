import request from "../api/index"

export function getData() {
    return request({
        method: "get",
        url: "/seller",
    })

}