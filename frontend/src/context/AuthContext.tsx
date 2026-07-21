import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api } from '@/services/api'

interface AuthContextValue {
  token: string | null
  username: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'portfolio_token'
const USER_KEY = 'portfolio_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem(USER_KEY))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function verify() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const me = await api.me()
        if (!cancelled) {
          setUsername(me.username)
          localStorage.setItem(USER_KEY, me.username)
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem(USER_KEY)
          setToken(null)
          setUsername(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void verify()
    return () => {
      cancelled = true
    }
  }, [token])

  const login = useCallback(async (user: string, password: string) => {
    const res = await api.login({ username: user, password })
    localStorage.setItem(TOKEN_KEY, res.token)
    localStorage.setItem(USER_KEY, res.username)
    setToken(res.token)
    setUsername(res.username)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUsername(null)
  }, [])

  const value = useMemo(
    () => ({
      token,
      username,
      isAuthenticated: Boolean(token),
      loading,
      login,
      logout,
    }),
    [token, username, loading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
