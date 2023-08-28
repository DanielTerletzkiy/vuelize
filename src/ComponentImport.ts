import {App} from "vue/dist/vue";
import DAccordion from './components/accordion/DAccordion.vue'
import DNavigationBar from './components/app/navigation/DNavigationBar.vue'
import DToolbar from './components/app/toolbar/DToolbar.vue'
import DAvatar from './components/avatar/DAvatar.vue'
import DBadge from './components/badge/DBadge.vue'
import DButton from './components/button/DButton.vue'
import DIconButton from './components/button/DIconButton.vue'
import DCard from './components/card/DCard.vue'
import DCardTitle from './components/card/text/DCardTitle.vue'
import DCardSubtitle from './components/card/text/DCardSubtitle.vue'
import DCardContent from './components/card/content/DCardContent.vue'
import DCheckbox from './components/checkbox/DCheckbox.vue'
import DSwitch from './components/switch/DSwitch.vue'
import DDivider from './components/divider/DDivider.vue'
import DDialog from './components/dialog/DDialog.vue'
import DColumn from './components/flex/DColumn.vue'
import DRow from './components/flex/DRow.vue'
import DSpacer from './components/flex/DSpacer.vue'
import DGrid from './components/flex/DGrid.vue'
import DIcon from './components/icon/DIcon.vue'
import DImage from './components/image/DImage.vue'
import DImageDiffuse from './components/image/DImageDiffuse.vue'
import DLabel from './components/label/DLabel.vue'
import DList from './components/list/DList.vue'
import DListItem from './components/list/DListItem.vue'
import DTabList from './components/tab/DTabList.vue'
import DDotLoader from './components/loader/DDotLoader.vue'
import DElevationLoader from './components/loader/DElevationLoader.vue'
import DSelectMenu from './components/menu/DSelectMenu.vue'
import DNotification from './components/notification/DNotification.vue'
import DNotificationWrapper from './components/notification/DNotificationWrapper.vue'
import DPagination from './components/pagination/DPagination.vue'
import DProgressbar from './components/progress/DProgressbar.vue'
import DTable from './components/table/DTable.vue'
import DTooltip from './components/tooltip/DTooltip.vue'
import DTextfield from './components/textfield/DTextfield.vue'
import DRadioGroup from './components/radio/DRadioGroup.vue'
import DRadioItem from './components/radio/DRadioItem.vue'
import DRating from './components/rating/DRating.vue'
import DRoot from './components/root/DRoot.vue'
import DLazy from './components/DLazy.vue'
import DWrapper from './components/DWrapper.vue'
import DTypography from "./components/typography/DTypography.vue";

export {
    DAccordion,
    DNavigationBar,
    DToolbar,
    DAvatar,
    DBadge,
    DButton,
    DIconButton,
    DCard,
    DCardTitle,
    DCardSubtitle,
    DCardContent,
    DCheckbox,
    DSwitch,
    DDivider,
    DDialog,
    DColumn,
    DRow,
    DSpacer,
    DGrid,
    DIcon,
    DImage,
    DImageDiffuse,
    DLabel,
    DList,
    DListItem,
    DTabList,
    DDotLoader,
    DElevationLoader,
    DSelectMenu,
    DNotification,
    DNotificationWrapper,
    DPagination,
    DTable,
    DTooltip,
    DTextfield,
    DRadioGroup,
    DRadioItem,
    DRating,
    DProgressbar,
    DRoot,
    DTypography,
    DLazy,
    DWrapper,
}

export function importAll(app: App) {
    app.component("DCardTitle", DCardTitle)
    app.component("DCard", DCard)
    app.component("DButton", DButton)
    app.component("DCardContent", DCardContent)
    app.component("DCardSubtitle", DCardSubtitle)
    app.component("DIconButton", DIconButton)
    app.component("DIcon", DIcon)
    app.component("DAccordion", DAccordion)
    app.component("DBadge", DBadge)
    app.component("DAvatar", DAvatar)
    app.component("DColumn", DColumn)
    app.component("DGrid", DGrid)
    app.component("DImage", DImage)
    app.component("DImageDiffuse", DImageDiffuse)
    app.component("DLabel", DLabel)
    app.component("DList", DList)
    app.component("DListItem", DListItem)
    app.component("DRadioItem", DRadioItem)
    app.component("DTabList", DTabList)
    app.component("DRadioGroup", DRadioGroup)
    app.component("DRow", DRow)
    app.component("DDialog", DDialog)
    app.component("DCheckbox", DCheckbox)
    app.component("DSwitch",DSwitch)
    app.component("DDivider", DDivider)
    app.component("DDotLoader", DDotLoader)
    app.component("DElevationLoader", DElevationLoader)
    app.component("DRoot", DRoot)
    app.component("DTable", DTable)
    app.component("DNavigationBar", DNavigationBar)
    app.component("DRating", DRating)
    app.component("DSpacer", DSpacer)
    app.component("DTextfield", DTextfield)
    app.component("DToolbar", DToolbar)
    app.component("DPagination", DPagination)
    app.component("DSelectMenu", DSelectMenu)
    app.component("DTooltip", DTooltip)
    app.component("DLazy", DLazy)
    app.component("DWrapper", DWrapper)
    app.component("DNotificationWrapper", DNotificationWrapper)
    app.component("DNotification", DNotification)
    app.component("DProgressbar", DProgressbar)
    app.component("DTypography", DTypography)
    return app;
}
