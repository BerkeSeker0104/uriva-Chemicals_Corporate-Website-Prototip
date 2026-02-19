import {
  seedSettings, seedLanguages, seedCategories, seedProducts,
  seedServices, seedBrands, seedBlogPosts, seedLeads,
} from './seedData.js'

const KEYS = {
  auth: 'puriva_auth',
  password: 'puriva_admin_password',
  settings: 'puriva_settings',
  languages: 'puriva_languages',
  products: 'puriva_products',
  categories: 'puriva_categories',
  services: 'puriva_services',
  brands: 'puriva_brands',
  blogPosts: 'puriva_blogPosts',
  leads: 'puriva_leads',
  initialized: 'puriva_initialized',
}

function get(key) {
  try { return JSON.parse(localStorage.getItem(key)) }
  catch { return null }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function crudFor(key) {
  return {
    getAll: () => get(key) ?? [],
    getById: (id) => (get(key) ?? []).find(item => item.id === id) ?? null,
    create: (data) => {
      const items = get(key) ?? []
      const now = new Date().toISOString()
      const item = { ...data, id: data.id || crypto.randomUUID(), createdAt: now, updatedAt: now }
      items.push(item)
      set(key, items)
      return item
    },
    update: (id, data) => {
      const items = get(key) ?? []
      const idx = items.findIndex(item => item.id === id)
      if (idx === -1) return null
      items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() }
      set(key, items)
      return items[idx]
    },
    delete: (id) => {
      const items = (get(key) ?? []).filter(item => item.id !== id)
      set(key, items)
    },
    setAll: (items) => set(key, items),
  }
}

export const db = {
  settings: {
    get: () => get(KEYS.settings) ?? seedSettings,
    set: (data) => set(KEYS.settings, data),
  },
  languages: {
    get: () => get(KEYS.languages) ?? seedLanguages,
    set: (data) => set(KEYS.languages, data),
  },
  products: crudFor(KEYS.products),
  categories: crudFor(KEYS.categories),
  services: crudFor(KEYS.services),
  brands: crudFor(KEYS.brands),
  blogPosts: crudFor(KEYS.blogPosts),
  leads: {
    ...crudFor(KEYS.leads),
    markRead: (id) => {
      const items = get(KEYS.leads) ?? []
      const idx = items.findIndex(item => item.id === id)
      if (idx !== -1) {
        items[idx].status = 'read'
        set(KEYS.leads, items)
      }
    },
    markUnread: (id) => {
      const items = get(KEYS.leads) ?? []
      const idx = items.findIndex(item => item.id === id)
      if (idx !== -1) {
        items[idx].status = 'unread'
        set(KEYS.leads, items)
      }
    },
    getUnreadCount: () => (get(KEYS.leads) ?? []).filter(l => l.status === 'unread').length,
  },
  auth: {
    getPassword: () => get(KEYS.password) ?? '123456',
    setPassword: (p) => set(KEYS.password, p),
    getToken: () => get(KEYS.auth),
    setToken: (t) => set(KEYS.auth, t),
    clearToken: () => localStorage.removeItem(KEYS.auth),
  },
}

export function initializeIfNeeded() {
  if (get(KEYS.initialized)) return
  set(KEYS.settings, seedSettings)
  set(KEYS.languages, seedLanguages)
  set(KEYS.categories, seedCategories)
  set(KEYS.products, seedProducts)
  set(KEYS.services, seedServices)
  set(KEYS.brands, seedBrands)
  set(KEYS.blogPosts, seedBlogPosts)
  set(KEYS.leads, seedLeads)
  set(KEYS.password, '123456')
  set(KEYS.initialized, true)
}
