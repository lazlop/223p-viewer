import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3001,
    // Vite's DNS-rebinding protection rejects requests whose Host header it doesn't recognize
    // (common over a VPN, where the client reaches this machine by a VPN-assigned IP/hostname).
    // This is a local dev tool for personal use, so disabling the check is fine here.
    allowedHosts: true
  }
})
