import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /** Channel Analysis became the source-agnostic Source Analysis page. */
  async redirects() {
    return [{ source: "/features/channel-analysis", destination: "/features/source-analysis", permanent: true }]
  },
}

export default nextConfig
