export type WebSocketAction = 'create_user' | 'undefined'

export interface WebSocketMessage {
    action: WebSocketAction
    id: string
    body: any
}

export interface CreateUserBody extends JSON {
    username: string
}