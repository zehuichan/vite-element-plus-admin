export default {
  // Whether to show the configuration button
  showSettingButton: true,

  // Whether to cancel the menu, the top, the multi-tab page display, for possible embedded in other systems
  fullContent: false,

  // Whether to display the logo
  showLogo: true,

  // Whether to show footer
  showFooter: false,

  // Header configuration
  headerSetting: {
    // Fixed at the top
    fixed: true,
    // Whether to show top
    show: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the notification button
    showNotice: true,
    // Whether to display the menu search
    showSearch: true
  },

  // Menu configuration
  menuSetting: {
    //  Whether to fix the left menu
    fixed: true,
    // Menu collapse
    collapsed: false,

    backgroundColor: '#001529',
    textColor: 'hsla(0, 0%, 100%, .65)',
    activeTextColor: 'hsla(0, 0%, 100%, .85)',
    width: '208px'
  },

  // Multi-label
  multiTabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true,
    // Turn on quick actions
    showQuick: true,
    // Whether to show the refresh button
    showRedo: true,
    // Whether to show the collapse button
    showFold: true
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: false,

  // Use error-handler-plugin
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true
}
