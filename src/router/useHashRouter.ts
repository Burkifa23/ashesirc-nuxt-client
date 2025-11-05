import { ref, computed } from 'vue'

export type RouteName = 'home' | 'topics' | 'archives' | 'about' | 'join' | 'apply' | 'article'

export interface RouteState {
  name: RouteName
  params: Record<string, string>
}

function parsePath(): RouteState {
  const path = window.location.pathname
  const segments = path.split('/').filter(Boolean)

  // Default route
  if (segments.length === 0) return { name: 'home', params: {} }

  const [first, second] = segments
  switch (first) {
    case 'topics':
      return { name: 'topics', params: {} }
    case 'archives':
      return { name: 'archives', params: {} }
    case 'about':
      return { name: 'about', params: {} }
    case 'join':
      return { name: 'join', params: {} }
    case 'apply':
      return { name: 'apply', params: {} }
    case 'article':
      return { name: 'article', params: { slug: second || '' } }
    default:
      return { name: 'home', params: {} }
  }
}

export function useRouter() {
  const state = ref<RouteState>(parsePath())

  const onPopState = () => {
    state.value = parsePath()
  }

  window.addEventListener('popstate', onPopState)

  const path = computed(() => state.value)

  const navigate = (to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
      state.value = parsePath()
    }
  }

  return { route: path, navigate }
}
