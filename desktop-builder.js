const builder = require("electron-builder")
const path = require('path');

const Platform = builder.Platform
const options = {
  targets: Platform.WINDOWS.createTarget(),
  config: {
    productName:"我的第一个electron程序",
    appId: "**",
    extraFiles: [
      {
        from: './',
        to: "resources/electron-demo",
        filter: ["**/*"]
      }
    ],
    directories: {
      output: 'dist',
    },
    publish: [
        {
          provider: "generic",
          url: 'uploadUrl'
        }
    ],
    asar: false,
    win: {
      target: "nsis",
      artifactName: "electron_demo.exe",
      icon:'favicon.ico'
    },
    nsis: {
      oneClick: false,//一键安装
      perMachine: true,
      allowElevation: true,
      displayLanguageSelector: true, //显示选择语言
      installerLanguages: ["zh_CN"],
      license: path.join(__dirname, 'LICENSE.txt'),
      allowToChangeInstallationDirectory: true,//允许选择目录
      createDesktopShortcut: true,//创建桌面快捷方式
      runAfterFinish: false,//安装完是否直接运行
      installerIcon: 'favicon.ico',//安装图标
      uninstallerIcon: 'favicon.ico'//卸载图标
    },
    electronDownload: {
      mirror: "http://npm.taobao.org/mirrors/electron/"
    }
  }
}
builder.build(options
)
  .then((result) => {
    console.log(JSON.stringify(result))
  })
  .catch((error) => {
    console.error(error)
  })

