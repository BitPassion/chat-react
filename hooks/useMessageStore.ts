import { Message } from '@xmtp/xmtp-js'
import { useReducer } from 'react'
import { MessageStoreEvent } from '../contexts/xmtp'

type MessageStore = { [address: string]: Message[] }

const useMessageStore = () => {
  const [messageStore, dispatchMessages] = useReducer(
    (state: MessageStore, { peerAddress, messages }: MessageStoreEvent) => {
      const existing = state[peerAddress] || []

      if (!messages.length) {
        return state
      }

      console.log('Dispatching new messages for peer address', peerAddress)

      return {
        ...state,
        [peerAddress]: existing.concat(messages),
      }
    },
    {}
  )

  return {
    messageStore,
    dispatchMessages,
  }
}

export default useMessageStore
