import request from '../utils/request'

export const listMessage = (channelId, maxCreateAt, limit, start, end) =>
    request({
        url: '/messages',
        method: 'GET',
        params: {
            channelId: channelId,
            maxCreateAt: maxCreateAt,
            limit: limit,
            start:start,
            end:end
        }
    })

export const saveMessage = (message) =>
    request({
        url: '/messages',
        method: 'POST',
        data: message
    })

export const readMessage = (channelId, total) =>
    request({
        url: '/messages/read',
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: {
            channelId: channelId,
            total: total
        }
    })

export const removeMessage = (messageId, channelId, toUserId) =>
    request({
        url: '/messages',
        method: 'DELETE',
        data: {
            messageId: messageId,
            channelId: channelId,
            toUserId: toUserId
        }
    })