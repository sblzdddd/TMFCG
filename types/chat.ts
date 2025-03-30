
declare global {
    type ChatMessage = {
        sender: User
        message: string
        timestamp: number
    }
}