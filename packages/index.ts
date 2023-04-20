import type { App } from "vue";

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
import zHeader from "./header"
import zMain from "./main"
import zAside from "./aside";
import zFooter from "./footer";
import zRow from "./row"
import zCol from "./col";
import zTag from "./tag";
import zSelect from "./select"
import zOptions from "./options"
import zProgress from "./progress";
import { zFormItem, zForm } from "./form";


import { zCheckbox, zCheckboxGroup } from "./checkbox";



import loading from "./directives/loading"

const plugins: any = [zButton, zInput, zTextarea, zIcon, ZMessage, zUpload, loading, zMenu, zTag, zProgress, zSwitch, zContainer, zHeader, zMain, zAside, zFooter, zRow, zCol, zSelect, zOptions, zFormItem, zForm, zCheckbox,
  zCheckboxGroup];

const install = (app: App) => {
  plugins.forEach((item) => {
    app.use(item);
  });
};
const ZUI = {
  install,
};

export { zButton, zInput, zTextarea, ZMessage, zUpload, ZLoading, zMenu, zTag, zProgress, zSwitch, zContainer, zHeader, zMain, zAside, zFooter, zRow, zCol, zSelect, zOptions, zFormItem, zForm, zCheckbox, zCheckboxGroup };
export default ZUI;
