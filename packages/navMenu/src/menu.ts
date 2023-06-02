import type { ExtractPropTypes, InjectionKey, PropType } from "vue";

export const menuProps = {
  label: {
    type: [Number, String] as PropType<string | number>,
  },
  value: {
    type: [Number, String] as PropType<string | number>,
  },
  trigger: {
    type: String,
    default: "click",
  },
  // 菜单宽度
  width: {
    type: String,
    default: "200px",
  },
  // 菜单 布局模式
  mode: {
    // horizontal / vertical
    type: String,
    default: "vertical",
  },
  collapse: Boolean,
  active: {
    type: [Number, String] as PropType<string | number>,
    default: "",
  },
  opens: {
    type: Array,
  },
  type: {
    type: String,
  },
  activeText: {
    type: String,
  },
  hoverBg: {
    type: String,
  },
} as const;

export type MenuProps = Partial<ExtractPropTypes<typeof menuProps>>;

export interface MenuContext extends MenuProps {
  menuActive: string | number;
  menu: Array<object>;
  openState: Array<string | number>;
  setOverflowStyle: (flag: boolean) => void;
  collectMneu: (item) => void;
  collectMneuContext: (item) => void;
  menuActiveChange: (path: string | number) => void;
  collectMenuState: (path: string | number, state: boolean) => void;
}

export const menuContextKey: InjectionKey<MenuContext> = Symbol();
