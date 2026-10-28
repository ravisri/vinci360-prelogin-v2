import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /** Channel Analysis became the source-agnostic Source Analysis page. */
      { source: "/features/channel-analysis", destination: "/features/source-analysis", permanent: true },
      /** The product tour was retired; interested visitors request a demo instead. */
      { source: "/product-tour", destination: "/request-demo", permanent: true },
    ]
  },
}

export default nextConfig
