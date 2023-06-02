import type { App } from "vue";

import zGlobalConfig from "./globalConfig";
import zButton from "./button/index";
import zInput from "./input/index";
import zTextarea from "./textarea/index";
import zIcon from "./icon/index";
import ZMessage from "./message";
import zUpload from "./upload";
import ZLoading from "./loading";
import zMenu from "./menu";
import zSwitch from "./switch";
import zContainer from "./container";
import zHeader from "./header";
import zMain from "./main";
import zAside from "./aside";
import zFooter from "./footer";
import zRow from "./row";
import zCol from "./col";
import zTag from "./tag";
// import zSelect from "./select"
import zOptions from "./options";
import zProgress from "./progress";
import { zFormItem, zForm } from "./form";
import zPopover from "./popover";
import zSkeleton from "./skeleton";
import zText from "./text";
import zColorPicker from "./colorPicker";
import zDatePicker from "./datePicker";

import { zCheckbox, zCheckboxGroup } from "./checkbox";
import { zRadio, zRadioGroup } from "./radio";

import { zOption, zSelect } from "./select-v2";

import zScrollbar from "./scrollbar/src";
import { zMenuItem, zMenuItemGroup, zNavMenu, zSubMenu } from "./navMenu";

import zDlalog from "./dialog";
import zDrawer from "./drawer";
import { zInfiniteScroll, zInfiniteScrollItem } from "./infiniteScroll";

// 指令
import loading from "./directives/loading";
import { SkeletonItem, Skeleton } from "./directives/skeleton";
import drag, { Drag } from "./directives/drag";

// 常用函数
import * as utils from "./utils/index";

const plugins: any = [
  zGlobalConfig,
  zButton,
  zInput,
  zTextarea,
  zIcon,
  ZMessage,
  zUpload,
  loading,
  drag,
  zMenu,
  zTag,
  zProgress,
  zSwitch,
  zContainer,
  zHeader,
  zMain,
  zAside,
  zFooter,
  zRow,
  zCol,
  zSelect,
  zOptions,
  zFormItem,
  zForm,
  zCheckbox,
  zCheckboxGroup,
  zRadio,
  zRadioGroup,
  zOption,
  zPopover,
  zScrollbar,
  zMenuItem,
  zMenuItemGroup,
  zNavMenu,
  zSubMenu,
  zSkeleton,
  zDlalog,
  zDrawer,
  zText,
  zColorPicker,
  zDatePicker,
  zInfiniteScroll,
  zInfiniteScrollItem,
];

const install = (app: App) => {
  plugins.forEach((item) => {
    app.use(item);
  });
};
const ZUI = {
  install,
};

export {
  zGlobalConfig,
  zButton,
  zInput,
  zTextarea,
  ZMessage,
  zUpload,
  ZLoading,
  zMenu,
  zTag,
  zProgress,
  zSwitch,
  zContainer,
  zHeader,
  zMain,
  zAside,
  zFooter,
  zRow,
  zCol,
  zSelect,
  zOptions,
  zFormItem,
  zForm,
  zCheckbox,
  zCheckboxGroup,
  zRadio,
  zRadioGroup,
  zOption,
  zPopover,
  zScrollbar,
  zMenuItem,
  zMenuItemGroup,
  zNavMenu,
  zSubMenu,
  zSkeleton,
  utils,
  SkeletonItem,
  Skeleton,
  zDlalog,
  Drag,
  zDrawer,
  zText,
  zColorPicker,
  zDatePicker,
  zInfiniteScroll,
  zInfiniteScrollItem,
};
export default ZUI;
