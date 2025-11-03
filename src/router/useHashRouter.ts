import { ref, computed } from 'vue'

export type RouteName = 'home' | 'topics' | 'archives' | 'about' | 'join' | 'article'

export interface RouteState {
  name: RouteName
  params: Record<string, string>
}

function parseHash(): RouteState {
  const hash = window.location.hash.replace(/^#/, '') || '/'
  const segments = hash.split('/').filter(Boolean)

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
    case 'article':
      return { name: 'article', params: { slug: second || '' } }
    default:
      return { name: 'home', params: {} }
  }
}

export function useHashRouter() {
  const state = ref<RouteState>(parseHash())

  const onHashChange = () => {
    state.value = parseHash()
  }

  window.addEventListener('hashchange', onHashChange)

  const path = computed(() => state.value)

  const navigate = (to: string) => {
    if (!to.startsWith('#')) {
      window.location.hash = to.startsWith('/') ? `#${to}` : `#/${to}`
    } else {
      window.location.hash = to
    }
  }

  return { route: path, navigate }
}
