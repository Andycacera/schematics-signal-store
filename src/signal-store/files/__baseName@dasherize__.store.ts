import { signalStore, withState } from '@ngrx/signals'

type <%= classify(baseName) %>State = {
  // Define your state properties here
  loading: boolean
  error: { type: any, message: string } | undefined
}

const initialState: <%= classify(baseName) %>State = {
  // Initialize your state properties here
  loading: false,
  error: undefined
}

export const <%= classify(baseName) %>Store = signalStore(
  withState(initialState),
  // Define your states, methods and computed signals here
)