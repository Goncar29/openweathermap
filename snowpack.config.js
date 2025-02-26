module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  buildOptions: {
    out: 'build',
    baseUrl: './',
    clean: true
  }
};
