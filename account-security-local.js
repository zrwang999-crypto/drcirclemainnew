(() => {
  const phoneNumber = "+86 15112341263";
  const root = document.getElementById("root");
  let layer;
  let phoneDraft = "";
  let wechatBound = localStorage.getItem("dr_wechat_bound") === "1";

  const style = document.createElement("style");
  style.textContent = `
    .dr-sec-layer{position:absolute;inset:0;z-index:140;background:#f8f4ed;color:#2f261d;display:flex;flex-direction:column;font-family:inherit}
    .dr-sec-header{height:72px;padding:24px 24px 0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
    .dr-sec-back{width:40px;height:40px;border:0;border-radius:12px;background:#fffaf5;color:#2f261d;font-size:22px;font-weight:900;box-shadow:0 8px 24px rgba(103,81,58,.08)}
    .dr-sec-title{font-size:18px;font-weight:900}
    .dr-sec-main{flex:1;overflow:auto;padding:18px 24px 120px;display:flex;flex-direction:column}
    .dr-sec-card{border:1px solid #eadfce;background:rgba(255,255,255,.82);border-radius:18px;box-shadow:0 12px 28px rgba(103,81,58,.05);overflow:hidden}
    .dr-sec-row{width:100%;border:0;background:transparent;display:flex;align-items:center;gap:14px;padding:18px;text-align:left;color:#2f261d}
    .dr-sec-row + .dr-sec-row{border-top:1px solid #f0e7dc}
    .dr-sec-icon{width:40px;height:40px;border-radius:12px;background:#f6ede3;border:1px solid #eadfce;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;color:#8f7f6d;flex-shrink:0}
    .dr-sec-icon svg,[data-dr-account-security-entry] svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .dr-sec-copy{min-width:0;flex:1}
    .dr-sec-label{font-size:14px;font-weight:900;margin:0}
    .dr-sec-desc{font-size:10px;line-height:1.5;font-weight:900;letter-spacing:.08em;color:#8f7f6d;margin:4px 0 0}
    .dr-sec-value{font-size:12px;font-weight:900;color:#8f7f6d;white-space:nowrap}
    .dr-sec-chev{color:#c0b09d;font-size:22px;font-weight:700}
    .dr-sec-danger{margin-top:18px;border-color:#fecdd3;background:#fff7f8}
    .dr-sec-danger .dr-sec-label,.dr-sec-danger .dr-sec-value{color:#f43f5e}
    .dr-sec-note{margin:16px 2px 0;color:#8f7f6d;font-size:12px;font-weight:700;line-height:1.7}
    .dr-sec-input{width:100%;height:52px;border:1px solid #eadfce;border-radius:14px;background:#fffaf5;padding:0 14px;font-size:15px;font-weight:900;color:#2f261d;outline:none;box-sizing:border-box}
    .dr-sec-primary{width:100%;height:52px;border:0;border-radius:14px;background:#2f261d;color:white;font-size:14px;font-weight:900}
    .dr-sec-ghost{width:100%;height:48px;border:1px solid #eadfce;border-radius:14px;background:white;color:#8f7f6d;font-size:13px;font-weight:900}
    .dr-sec-modal{position:absolute;inset:0;z-index:160;background:rgba(0,0,0,.34);backdrop-filter:blur(8px);display:flex;align-items:flex-end;padding:20px;box-sizing:border-box}
    .dr-sec-sheet{width:100%;border-radius:24px;background:#fffaf5;padding:24px 20px 20px;box-shadow:0 -18px 50px rgba(73,55,39,.18)}
    .dr-sec-sheet h3{margin:0;text-align:center;font-size:20px;font-weight:900;color:#2f261d}
    .dr-sec-sheet p{margin:12px auto 0;max-width:300px;text-align:center;font-size:12px;font-weight:800;line-height:1.8;color:#8f7f6d}
    .dr-sec-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}
    .dr-sec-cancel{height:48px;border:0;border-radius:14px;background:white;color:#8f7f6d;font-weight:900}
    .dr-sec-confirm{height:48px;border:0;border-radius:14px;background:#f43f5e;color:white;font-weight:900}
    .dr-detail-share-actions{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:18px 0 2px;padding-top:14px;border-top:1px solid #f0e7dc}
    .dr-detail-share-action{border:0;background:transparent;color:#2f261d;font-size:10px;font-weight:900;text-align:center;padding:0;white-space:nowrap}
    .dr-detail-share-icon{width:38px;height:38px;border-radius:14px;margin:0 auto 7px;background:#f6ede3;border:1px solid #eadfce;display:flex;align-items:center;justify-content:center;color:#8f7f6d}
    .dr-detail-share-icon svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
    .dr-detail-share-danger{color:#f43f5e}
    .dr-detail-share-danger .dr-detail-share-icon{background:#fff7f8;border-color:#fecdd3;color:#f43f5e}
  `;
  document.head.appendChild(style);

  function phoneFrame() {
    return root && root.firstElementChild;
  }

  function toast(text) {
    const node = document.createElement("div");
    node.textContent = text;
    node.style.cssText = "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:180;padding:14px 22px;border-radius:999px;background:rgba(0,0,0,.82);color:white;font-size:12px;font-weight:800;white-space:nowrap;box-shadow:0 18px 40px rgba(0,0,0,.18)";
    const frame = phoneFrame();
    if (!frame) return;
    frame.appendChild(node);
    setTimeout(() => node.remove(), 1600);
  }

  function mount(html) {
    const frame = phoneFrame();
    if (!frame) return;
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "dr-sec-layer";
      frame.appendChild(layer);
    }
    layer.innerHTML = html;
    bindLayer();
  }

  function closeLayer() {
    if (layer) {
      layer.remove();
      layer = null;
    }
  }

  function icon(name) {
    const icons = {
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"></rect><path d="M10 18h4"></path></svg>',
      wechat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6.5C5.9 6.5 3 8.8 3 11.7c0 1.6.9 3 2.3 4l-.5 2 2.4-1.2c.8.2 1.6.4 2.5.4 3.6 0 6.5-2.3 6.5-5.2S13.1 6.5 9.5 6.5Z"></path><path d="M14 10.5c3 0 5.5 1.9 5.5 4.3 0 1.2-.6 2.3-1.6 3.1l.4 1.6-2-1c-.7.2-1.4.3-2.1.3-2.3 0-4.3-1.1-5.1-2.7"></path><path d="M7.5 10.7h.01M11.3 10.7h.01"></path></svg>',
      logout: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3.8 17.5a2 2 0 0 0 1.7 3h13a2 2 0 0 0 1.7-3L12 3Z"></path><path d="M12 8v5"></path><path d="M12 17h.01"></path></svg>',
      shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 19 6v5.5c0 4.2-2.8 7.7-7 9-4.2-1.3-7-4.8-7-9V6l7-3Z"></path><path d="m9.4 12 1.7 1.7 3.8-4"></path></svg>'
    };
    return icons[name] || "";
  }

  function securityPage() {
    mount(`
      <header class="dr-sec-header">
        <button class="dr-sec-back" data-action="close" aria-label="返回">‹</button>
        <div class="dr-sec-title">账号与安全</div>
        <div style="width:40px"></div>
      </header>
      <main class="dr-sec-main" style="padding-bottom:38px">
        <section class="dr-sec-card">
          <button class="dr-sec-row" data-action="phone">
            <span class="dr-sec-icon">${icon("phone")}</span>
            <span class="dr-sec-copy">
              <p class="dr-sec-label">手机号码</p>
            </span>
            <span class="dr-sec-value">${phoneNumber}</span>
            <span class="dr-sec-chev">›</span>
          </button>
          <button class="dr-sec-row" data-action="wechat">
            <span class="dr-sec-icon">${icon("wechat")}</span>
            <span class="dr-sec-copy">
              <p class="dr-sec-label">微信</p>
            </span>
            <span class="dr-sec-value">${wechatBound ? "已绑定" : "未绑定"}</span>
            <span class="dr-sec-chev">›</span>
          </button>
        </section>
        <div style="flex:1;min-height:0"></div>
        <div style="margin-top:auto">
          <section class="dr-sec-card dr-sec-danger">
            <button class="dr-sec-row" data-action="delete">
              <span class="dr-sec-icon">${icon("logout")}</span>
              <span class="dr-sec-copy">
                <p class="dr-sec-label">注销帐号</p>
              </span>
              <span class="dr-sec-chev">›</span>
            </button>
          </section>
        </div>
      </main>
    `);
  }

  function phonePage() {
    mount(`
      <header class="dr-sec-header">
        <button class="dr-sec-back" data-action="security" aria-label="返回">‹</button>
        <div class="dr-sec-title">换绑手机号码</div>
        <div style="width:40px"></div>
      </header>
      <main class="dr-sec-main">
        <section class="dr-sec-card" style="padding:20px">
          <p class="dr-sec-desc" style="margin:0 0 8px">当前手机号码</p>
          <p class="dr-sec-label" style="font-size:20px;margin-bottom:18px">${phoneNumber}</p>
          <p class="dr-sec-desc" style="margin:0 0 8px">新手机号码</p>
          <input class="dr-sec-input" data-phone-input inputmode="tel" maxlength="11" placeholder="请输入新的 11 位手机号" value="${phoneDraft}">
          <button class="dr-sec-primary" data-action="save-phone" style="margin-top:16px">获取验证码并换绑</button>
          <button class="dr-sec-ghost" data-action="security" style="margin-top:12px">取消</button>
        </section>
        <p class="dr-sec-note">换绑成功后，下次登录和安全验证都会使用新的手机号码。</p>
      </main>
    `);
  }

  function wechatPage() {
    mount(`
      <header class="dr-sec-header">
        <button class="dr-sec-back" data-action="security" aria-label="返回">‹</button>
        <div class="dr-sec-title">微信授权绑定</div>
        <div style="width:40px"></div>
      </header>
      <main class="dr-sec-main">
        <section class="dr-sec-card" style="padding:26px 20px;text-align:center">
          <div class="dr-sec-icon" style="margin:0 auto 16px;width:56px;height:56px;border-radius:18px;color:#22c55e">${icon("wechat")}</div>
          <p class="dr-sec-label" style="font-size:20px">跳转至微信进行绑定</p>
          <p class="dr-sec-note" style="margin:12px auto 0">请在微信授权页确认绑定。这里是本地原型展示，点击下方按钮模拟授权完成。</p>
          <button class="dr-sec-primary" data-action="finish-wechat" style="margin-top:22px">完成微信授权</button>
        </section>
      </main>
    `);
  }

  function loginPage() {
    mount(`
      <main class="dr-sec-main" style="justify-content:center;padding-bottom:120px">
        <section class="dr-sec-card" style="padding:28px 22px;text-align:center">
          <p class="dr-sec-label" style="font-size:26px;margin:0">DRcircle</p>
          <p class="dr-sec-note" style="margin:10px auto 22px">账号已注销，请重新登录或注册新的账号。</p>
          <input class="dr-sec-input" inputmode="tel" placeholder="请输入手机号">
          <button class="dr-sec-primary" style="margin-top:14px">获取验证码</button>
          <button class="dr-sec-ghost" style="margin-top:12px">微信登录</button>
        </section>
      </main>
    `);
  }

  function goToLoginPage() {
    closeLayer();
    setTimeout(() => {
      const logoutButton = [...document.querySelectorAll("button")].find((button) =>
        button.textContent.includes("退出当前账号")
      );
      if (logoutButton) {
        logoutButton.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        return;
      }
      loginPage();
    }, 80);
  }

  function deleteModal() {
    if (!layer) return;
    const modal = document.createElement("div");
    modal.className = "dr-sec-modal";
    modal.innerHTML = `
      <section class="dr-sec-sheet">
        <h3>确认注销帐号？</h3>
        <p>注销后，账号内钻石和积分都会清零；真爱圈会被清空，情侣关系也会消失。账号资料、作品、关系展示和互动记录将全部被系统销毁。</p>
        <div class="dr-sec-actions">
          <button class="dr-sec-confirm" data-action="confirm-delete">确认注销</button>
          <button class="dr-sec-cancel" data-action="cancel-delete">再想想</button>
        </div>
      </section>
    `;
    layer.appendChild(modal);
    bindLayer();
  }

  function bindLayer() {
    if (!layer) return;
    layer.querySelectorAll("[data-action]").forEach((el) => {
      el.onclick = () => {
        const action = el.getAttribute("data-action");
        if (action === "close") closeLayer();
        if (action === "security") securityPage();
        if (action === "phone") phonePage();
        if (action === "wechat") {
          toast("正在跳转至微信绑定");
          wechatPage();
        }
        if (action === "finish-wechat") {
          localStorage.setItem("dr_wechat_bound", "1");
          wechatBound = true;
          toast("微信已绑定");
          securityPage();
        }
        if (action === "save-phone") {
          const input = layer.querySelector("[data-phone-input]");
          phoneDraft = input ? input.value.trim() : "";
          toast(phoneDraft.length === 11 ? "验证码已发送" : "请输入 11 位手机号");
        }
        if (action === "delete") deleteModal();
        if (action === "cancel-delete") layer.querySelector(".dr-sec-modal")?.remove();
        if (action === "confirm-delete") {
          localStorage.setItem("dr_account_delete_requested", "1");
          layer.querySelector(".dr-sec-modal")?.remove();
          toast("注销成功");
          setTimeout(goToLoginPage, 900);
        }
      };
    });
  }

  function injectSettingsEntry() {
    const title = [...document.querySelectorAll("h2")].find((el) => el.textContent.trim() === "系统设置");
    if (!title || document.querySelector("[data-dr-account-security-entry]")) return;
    const main = title.closest("div")?.querySelector("main");
    if (!main) return;
    const entry = document.createElement("div");
    entry.setAttribute("data-dr-account-security-entry", "1");
    entry.className = "p-4 flex items-center gap-4 active:bg-[#faf4ec] transition-colors cursor-pointer rounded-[18px] bg-white/82 border border-[#eadfce] shadow-sm";
    entry.innerHTML = `
      <div class="w-10 h-10 rounded-lg flex items-center justify-center text-[#8f7f6d] bg-[#f6ede3] border border-[#eadfce]" style="font-weight:900">${icon("shield")}</div>
      <div class="flex-1">
        <p class="text-sm font-bold text-[#2f261d]">账号与安全</p>
        <p class="text-[10px] text-[#8f7f6d] font-black uppercase tracking-widest mt-0.5">手机号码、微信、注销帐号</p>
      </div>
      <span style="color:#c0b09d;font-size:22px;font-weight:700">›</span>
    `;
    entry.onclick = securityPage;
    const first = main.firstElementChild;
    if (first) {
      main.insertBefore(entry, first);
    } else {
      main.appendChild(entry);
    }
  }

  function isContentDetailShareContext() {
    return [...document.querySelectorAll("button")].some((button) => {
      const label = button.getAttribute("aria-label") || button.textContent;
      return label.includes("赠送礼物") || label.includes("进入纯净模式") || label.includes("展开共创人");
    });
  }

  function shareIcon(name) {
    const icons = {
      wechat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6.5C5.9 6.5 3 8.8 3 11.7c0 1.6.9 3 2.3 4l-.5 2 2.4-1.2c.8.2 1.6.4 2.5.4 3.6 0 6.5-2.3 6.5-5.2S13.1 6.5 9.5 6.5Z"></path><path d="M14 10.5c3 0 5.5 1.9 5.5 4.3 0 1.2-.6 2.3-1.6 3.1l.4 1.6-2-1c-.7.2-1.4.3-2.1.3-2.3 0-4.3-1.1-5.1-2.7"></path></svg>',
      moments: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"></circle><path d="M12 2.8v4M12 17.2v4M4.8 4.8l2.8 2.8M16.4 16.4l2.8 2.8M2.8 12h4M17.2 12h4M4.8 19.2l2.8-2.8M16.4 7.6l2.8-2.8"></path></svg>',
      link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 0 0-7.1-7.1L10.8 5"></path><path d="M14 11a5 5 0 0 0-7.1 0l-1.4 1.4a5 5 0 0 0 7.1 7.1l.6-.6"></path></svg>',
      save: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M7 3v6h10"></path><path d="M8 21v-7h8v7"></path></svg>',
      report: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v16"></path><path d="M4 5h11l-.7 4 2.7 3H4"></path></svg>'
    };
    return icons[name] || "";
  }

  function enhanceContentDetailShareSheet() {
    if (!isContentDetailShareContext()) return;
    const title = [...document.querySelectorAll("h3")].find((node) => node.textContent.trim() === "邀请用户");
    const sheet = title?.closest("div[class*='border-t'][class*='px-5']");
    if (!sheet || sheet.querySelector("[data-dr-detail-share-actions]")) return;
    const actions = document.createElement("div");
    actions.setAttribute("data-dr-detail-share-actions", "1");
    actions.className = "dr-detail-share-actions";
    actions.innerHTML = [
      ["wechat", "微信好友"],
      ["moments", "朋友圈"],
      ["link", "分享链接"],
      ["save", "保存至相册"],
      ["report", "举报", "dr-detail-share-danger"]
    ].map(([name, label, className]) => `
      <button class="dr-detail-share-action ${className || ""}" data-dr-detail-share-action="${name}">
        <span class="dr-detail-share-icon">${shareIcon(name)}</span>
        ${label}
      </button>
    `).join("");
    sheet.appendChild(actions);
    actions.querySelectorAll("[data-dr-detail-share-action]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const action = button.getAttribute("data-dr-detail-share-action");
        if (action === "link") navigator.clipboard?.writeText(location.href).catch(() => {});
        const messages = {
          wechat: "已打开微信好友",
          moments: "已打开朋友圈",
          link: "分享链接已复制",
          save: "已保存至相册",
          report: "已打开举报入口"
        };
        toast(messages[action] || "已选择分享方式");
      });
    });
  }

  new MutationObserver(() => {
    injectSettingsEntry();
    enhanceContentDetailShareSheet();
  }).observe(document.body, { childList: true, subtree: true });
  injectSettingsEntry();
  enhanceContentDetailShareSheet();
})();
