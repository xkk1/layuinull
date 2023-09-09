layui.use(function () {
    let element = layui.element;
    let util = layui.util;
    element.render("nav");
    // 标签页
    let tabName = "layuinull-tab";
    let layuinullTab = document.getElementById(tabName);
    util.on("lay-on", {
        openTab: function () {
            let href = this.getAttribute("href");
            // 判断标签页是否已经打开
            let is_open = false;
            for (let i = 0; i < layuinullTab.children.length; i++) {
                if (href == layuinullTab.children[i].attributes["lay-id"].value) {
                    is_open = true;
                    break;
                }
            }
            if (is_open) {
                // 若已打开切换到指定选项卡
                element.tabChange(tabName, href);
            } else {
                // 未开新增一个选项卡
                element.tabAdd(tabName, {
                    title: this.innerHTML,
                    content: '<iframe src="' + href + '" frameborder="0"></iframe>',
                    id: href,
                    change: true // 添加完毕后即自动切换
                });
            }
            // 移除点击菜单项出现的选中效果
            this.parentElement.classList.remove("layui-this");
        }
    });
    // 阻止所有用于打开标签的 <a lay-on="openTab"></a> 的默认事件
    let nav_a = document.querySelectorAll(".layuinull-left-nav a[lay-on=openTab]");
    for (let i = 0; i < nav_a.length; i++) {
        nav_a[i].onclick = function () {
            return false;
        }
    }
    // 默认打开的页面，可删除
    element.tabAdd(tabName, {
        title: '<i class="layui-icon layui-icon-home"></i> 主页',
        content: '<iframe src="page/home.html" frameborder="0"></iframe>',
        id: 'page/home.html',
        change: true // 添加完毕后即自动切换
    });
});

/**
 * 返回一个函数，调用该函数可以更改相应标签的 style.display
 * 
 * @param {*} layuinull_pc_open_nav_display 设置 #layuinull-pc-open-nav 的 style.display
 * @param {*} layuinull_pc_close_nav_display 设置 #layuinull-pc-close-nav 的 style.display
 * @param {*} layuinull_mobile_open_nav_display 设置 #layuinull-mobile-open-nav 的 style.display
 * @param {*} layuinull_left_nav_wrap_display 设置 #layuinull-left-nav-wrap 的 style.display
 * @returns function 返回的函数
 */
function layuinull_open_close_nav_function(
    layuinull_pc_open_nav_display, layuinull_pc_close_nav_display,
    layuinull_mobile_open_nav_display, layuinull_left_nav_wrap_display) {
    return function () {
        document.getElementById("layuinull-pc-open-nav").style.display = layuinull_pc_open_nav_display;
        document.getElementById("layuinull-pc-close-nav").style.display = layuinull_pc_close_nav_display;
        document.getElementById("layuinull-mobile-open-nav").style.display = layuinull_mobile_open_nav_display;
        document.getElementById("layuinull-left-nav-wrap").style.display = layuinull_left_nav_wrap_display;
    }
}

// 电脑端点击打开左侧边栏
document.getElementById("layuinull-pc-open-nav").onclick = layuinull_open_close_nav_function("none", "block", "block", "");

// 电脑端点击关闭左侧边栏
document.getElementById("layuinull-pc-close-nav").onclick = layuinull_open_close_nav_function("block", "none", "block", "none");

// 手机端点击打开左侧边栏
document.getElementById("layuinull-mobile-open-nav").onclick = layuinull_open_close_nav_function("none", "block", "none", "flex");

// 手机端点击关闭左侧边栏
document.getElementById("layuinull-mobile-close-nav").onclick = layuinull_open_close_nav_function("none", "block", "block", "");

// 点击 logo 关闭侧边栏
document.getElementById("layuinull-logo").onclick = layuinull_open_close_nav_function("block", "none", "block", "none");