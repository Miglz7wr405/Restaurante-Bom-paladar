export const MENU_TAB_EVENT = 'bp:menu-tab'

export function selectMenuTab(tabId: string) {
  window.dispatchEvent(new CustomEvent<string>(MENU_TAB_EVENT, { detail: tabId }))
}
