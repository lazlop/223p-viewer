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
    allowedHosts: true,
    // python/.venv (the anywidget/marimo packaging under python/) has thousands of site-packages
    // files that are never part of this app's own source — watching them blows past the OS's
    // inotify watch limit (ENOSPC: "System limit for number of file watchers reached") on a
    // machine already running other file-watching processes. Excluded rather than raising the
    // system-wide limit, since that's a per-project fix that doesn't need root.
    watch: {
      ignored: ['**/python/.venv/**'],
    },
  }
})
