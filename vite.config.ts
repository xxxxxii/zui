/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-02-26 19:13:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 09:34:38
 * @FilePath: \vue3-music\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-vue-markdown";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";



// https://vitejs.dev/config/
export default defineConfig({
  base: '/zui',
  plugins: [
    vue({
      include: [/\.md$/, /\.vue$/],
    }),
    vueJsx(),
    Markdown(),
  ],

  build: {
    rollupOptions: {
      external: [
        "vue",
        "md-editor-v3",
        'vueRouter',
        "vite-plugin-vue-markdown",
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    lib: {
      entry: "./packages/index.ts",
      name: "v3-yl-ui",
    },

    minify: "terser",
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true
    //   }
    // }

  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "packages"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/assets/style/index.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, " "), // 重写路径把路径变成空字符
      },
    },
  },
});
