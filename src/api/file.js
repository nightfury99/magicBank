import request from '@/utils/file-request'

export function getMedias() {
    return request({
        url: `/list?bucket=${process.env.STORAGE_FOLDER}`,
        method: 'get',
    })
}

export function uploadFile(file) {

    let form_data = new FormData()

    form_data.append('bucket', process.env.STORAGE_FOLDER)
    form_data.append('file', file)

    return request({
        url: `/upload`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: form_data
    })
}