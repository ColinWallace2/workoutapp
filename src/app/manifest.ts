import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aura - Elite Fitness',
    short_name: 'Aura',
    description: 'Highly addictive, retention-focused workout tracking.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f2f5',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
      {
        src: '/maskable-icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
