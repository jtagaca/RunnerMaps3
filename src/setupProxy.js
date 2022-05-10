const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/test", {
      target: "http://localhost:8000/index.php",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/login", {
      target: "http://localhost:8000/index.php",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/getAllRooms", {
      target: "http://localhost:8000/index.php",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/updateRoom", {
      target: "http://localhost:8000/index.php",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/AddNewRoom", {
      target: "http://localhost:8000/index.php",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/logout", {
      target: "http://localhost:8000/index.php",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/register", {
      target: "http://localhost:8000/index.php",
      changeOrigin: true,
    })
  );
};
