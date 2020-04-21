export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!(store.state.auth.loggedIn && store.state.auth.strategy === 'local')) {
    return redirect('/')
  }
}
