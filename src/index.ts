import { Config, setConfig } from './config'
import { handleErr, handlePv, handlePerf, handleHashchange, handleHistorystatechange,  } from './handlers'
import {on,off} from './utils/tools'

export default class Bombay {
  config: ConfigParams

  constructor(options, fn) {
    this.init(options)
    
  }

  init(options) {
    // 没有token,则不监听任何事件
    if (options && !options.token) {
      console.warn('请输入一个token')
      return
    }
    setConfig(options)
    Config.autoSendPv && this.sendPv();
    Config.isPage && this.sendPerf();

    Config.enableSPA && this.addListenRouterChange();
    Config.isError && this.addListenJs();
    Config.isAjax && this.addListenAjax();
    Config.isRecord && this.addRrweb();
  }

  sendPv() {
    handlePv()
  }

  sendPerf() {
    handlePerf()
  }

  // 监听路由
  addListenRouterChange() {
    on('hashchange', handleHashchange)
    on('historystatechange', handleHistorystatechange)
    
  }

  addListenJs() {
    // js错误或静态资源加载错误
    on('error', handleErr)
    //promise错误
    on('unhandledrejection', handleErr)
    // window.addEventListener('rejectionhandled', rejectionhandled, true);
    
  }

  addListenAjax() {

  }

  addRrweb() {

  }

  // 移除路由
  removeListenRouterChange() {
    off('hashchange', handleHashchange)
    off('historystatechange', handleHistorystatechange)
    
  }

  removeListenJs() {
    off('error', handleErr)
    off('unhandledrejection', handleErr)
  }

  removeListenAjax() {

  }

  removeRrweb() {

  }

  destroy() {
    Config.enableSPA && this.removeListenRouterChange();
    Config.isError && this.removeListenJs()
    Config.isAjax && this.removeListenAjax()
    Config.isRecord && this.removeRrweb()
  }
}