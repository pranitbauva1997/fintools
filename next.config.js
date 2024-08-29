// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: "export",

  async redirects() {
    return [
      {
        source: "/",
        destination: "/sip",
        permanent: true,
      },
      {
        source: "/emi",
        destination: "/emi/home-loan",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
