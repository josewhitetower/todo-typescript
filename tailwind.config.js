module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ['./public/*.html', './src/**/*.ts'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
