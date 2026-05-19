# DR圈 主体页独立部署

这是从原项目里拆出来的主应用目录，只包含 app 内主体页面体验，默认直接进入首页，不再经过登录注册流程。

## 启动

```bash
npm install
npm run dev
```

默认本地端口是 `3020`。

## 构建

```bash
npm run build
```

构建产物位于 `dist/`，可以直接部署到静态托管平台。

## 部署建议

- Vercel：把 `app-standalone` 设为 Root Directory，构建命令用 `npm run build`，输出目录用 `dist`
- Netlify：Base directory 设为 `app-standalone`，Build command 用 `npm run build`，Publish directory 用 `dist`
- 其他静态托管：上传 `dist/` 即可

## 说明

- 入口默认直接落在 app 首页
- 登录页仍保留在代码里作为备用路由，但默认不会进入
- 适合单独部署到主站、内测地址或独立子域名
