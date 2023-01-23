import { ITab } from '@/store/type';
export function getTabs(): ITab[] {
  let indexPage = [
    {
      title: '首页',
      path: '/dashboard',
    }
  ]
  return JSON.parse(sessionStorage.getItem('tabsView') || JSON.stringify(indexPage));
}
export function setTabs(tabs: ITab[]): void {
  sessionStorage.setItem('tabsView', JSON.stringify(tabs));
}
