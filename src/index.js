//Imports store
import store from "./store";

//Imports Unicon
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.es'
import * as uc from 'vue-unicons/dist/icons'

//Imports Ripple
import Ripple from "vue-material-design-ripple";
import "vue-material-design-ripple/dist/vue-material-design-ripple.css";

//Imports flex mixin
import flex from "./mixins/flex.js";

//Imports Components
import DFunctionWrapper from "./components/FunctionWrapper.vue";

import DCard from "./components/card/Card.vue";
import DCardTitle from "./components/card/text/CardTitle.vue";
import DBtn from "./components/button/Button.vue";
import DIconButton from "./components/button/IconButton.vue";
import DIcon from "./components/icon/Icon.vue";
import DCheckbox from "./components/checkbox/Checkbox.vue";
import DList from "./components/list/List.vue";
import DListItem from "./components/list/ListItem.vue";
import DRoot from "./components/Root.vue";
import DTextField from "./components/textfield/Textfield.vue";
import DSelect from "./components/textfield/Select.vue";
import DAvatar from "./components/avatar/Avatar.vue";
import DCardSubtitle from "./components/card/text/CardSubtitle.vue";
import DSelectMenu from "./components/menu/SelectMenu.vue";
import DImage from "./components/image/Image.vue";
import DCardContent from "./components/card/content/CardContent.vue";
import DDivider from "./components/divider/Divider.vue";
import DRow from "./components/flex/Row.vue";
import DColumn from "./components/flex/Column.vue";
import DSpacer from "./components/flex/Spacer.vue";
import DCodeSnippet from "./components/code/CodeSnippet.vue";
import DCodeLine from "./components/code/CodeLine.vue";
import DTooltip from "./components/tooltip/Tooltip.vue";
import DToolbar from "./components/app/toolbar/Toolbar.vue";
import DNavigationBar from "./components/app/navigation/NavigationBar.vue";
import DTabList from "./components/tab/TabList.vue";
import DTabItem from "./components/tab/TabItem.vue";
import DAccordion from "./components/accordion/Accordion.vue";
import DNotification from "./components/notification/Notification.vue";
import DNotificationWrapper from "./components/notification/NotificationWrapper.vue";
import DBadge from "./components/badge/Badge.vue";
import DLabel from "./components/label/Label.vue";
import DProgressbar from "./components/progress/Progressbar.vue";

export default Vue => {

    //Imports all components
    Vue.component("d-card", DCard);
    Vue.component("d-card-title", DCardTitle);
    Vue.component("d-card-subtitle", DCardSubtitle);
    Vue.component("d-btn", DBtn);
    Vue.component("d-icon-button", DIconButton);
    Vue.component("d-icon", DIcon);
    Vue.component("d-checkbox", DCheckbox);
    Vue.component("d-list", DList);
    Vue.component("d-list-item", DListItem);
    Vue.component("d-root", DRoot);
    Vue.component("d-text-field", DTextField);
    Vue.component("d-select", DSelect);
    Vue.component("d-avatar", DAvatar);
    Vue.component("d-select-menu", DSelectMenu);
    Vue.component("d-image", DImage);
    Vue.component("d-card-content", DCardContent);
    Vue.component("d-divider", DDivider);
    Vue.component("d-row", DRow);
    Vue.component("d-column", DColumn);
    Vue.component("d-spacer", DSpacer);
    Vue.component("d-code-snippet", DCodeSnippet);
    Vue.component("d-code-line", DCodeLine);
    Vue.component("d-tooltip", DTooltip);
    Vue.component("d-toolbar", DToolbar);
    Vue.component("d-navigation-bar", DNavigationBar);
    Vue.component("d-tab-list", DTabList);
    Vue.component("d-tab-item", DTabItem);
    Vue.component("d-accordion", DAccordion);
    Vue.component("d-notification", DNotification);
    Vue.component("d-notification-wrapper", DNotificationWrapper);
    Vue.component("d-badge", DBadge);
    Vue.component("d-label", DLabel);
    Vue.component("d-progressbar", DProgressbar);


    //-----------------------

    //Implement store
    Vue.prototype.$vuelize = store.state

    //Register Unicons
    const objArray = [];
    Object.keys(uc).forEach(key => objArray.push(
        uc[key]
    ));
    Unicon.add(objArray)
    Vue.use(Unicon)

    //Register ripple directive
    Vue.directive("ripple", Ripple);


    //Imports FunctionWrapper
    Vue.component('d-function-wrapper', DFunctionWrapper)


    //Vue mixin
    Vue.mixin({
        mixins: [flex],
        //Default props
        props: {
            rootTag: {type: String, default: 'div'},
            color: String,
            disabled: Boolean,

            rounded: {type: String, default: 'lg'},
            elevation: [String, Number, undefined],
            outlined: Boolean,
            inlined: Boolean,
            depressed: Boolean,

            dark: Boolean,
            light: Boolean,

            link: {type: String, default: null}
        }
    })


    //Click outside directive
    Vue.directive('click-outside', {
        bind: function (el, binding, vnode) {
            el.clickOutsideEvent = function (event) {
                if (!(el === event.target || el.parentNode.parentNode.contains(event.target) || el.contains(event.target))) {
                    vnode.context[binding.expression](event);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function (el) {
            document.body.removeEventListener('click', el.clickOutsideEvent)
        },
    });

    //Hover directive
    Vue.directive('hover', {
        bind: function (el, binding, vNode) {
            // Provided expression must evaluate to an object.
            const compName = vNode.context.name
            if (typeof binding.value !== 'object') {
                let warn = `[v-hover]: provided expression '${binding.expression}' is not an object, but it needs to be.`
                if (compName) { warn += `\nFound in component '${compName}'` }
                console.warn(warn)
            }
            if (!binding.value.over && !binding.value.leave) {
                let warn = `[v-hover]: object provided does not have 'over' or 'leave' properties. Needs at least one to be of use`
                if (compName) { warn += `\nFound in component '${compName}'` }
                console.warn(warn)
            }
            el.__vHoverOver__ = binding.value.over || (() => {})
            el.__vHoverLeave__ = binding.value.leave || (() => {})

            // Add Event Listeners
            el.addEventListener('mouseover', el.__vHoverOver__)
            el.addEventListener('mouseleave', el.__vHoverLeave__)
            el.addEventListener('touchmove', el.__vHoverOver__)
            el.addEventListener('touchend', el.__vHoverLeave__)
        },
        unbind: function (el) {
            // Remove Event Listeners
            el.removeEventListener('mouseover', el.__vHoverOver__)
            el.removeEventListener('mouseleave', el.__vHoverLeave__)
            el.removeEventListener('touchmove', el.__vHoverOver__)
            el.removeEventListener('touchend', el.__vHoverLeave__)
            delete el.__vHoverOver__
            delete el.__vHoverLeave__
        }
    })

    Vue.config.productionTip = false

    //Color process functions
    Vue.prototype.processColor = function (color) {
        let colorOut;
        if (this.$vuelize.theme.dark) {
            colorOut = this.$vuelize.theme.themes.dark[color]
        } else {
            colorOut = this.$vuelize.theme.themes.light[color]
        }
        if (!colorOut) {
            return color
        } else {
            return colorOut
        }
    }

    Vue.prototype.getContrast = function (color) {
        let hexColor = this.processColor(color || this.color);
        if (hexColor.slice(0, 1) === '#') {
            hexColor = hexColor.slice(1);
        }
        if (hexColor.length === 3) {
            hexColor = hexColor.split('').map(function (hex) {
                return hex + hex;
            }).join('');
        }
        // Convert to RGB value
        let r = parseInt(hexColor.substr(0, 2), 16);
        let g = parseInt(hexColor.substr(2, 2), 16);
        let b = parseInt(hexColor.substr(4, 2), 16);
        // Get YIQ ratio
        let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        // Check contrast
        return (yiq >= 160) ? '#000' : '#fff';

    }

    //Notification Functions
    Vue.prototype.$notify = function (title, content, type, options){
        Vue.prototype.$vuelize.notification.notifications.push({
            title,
            content,
            type,
            options,
            active: true,
            created: new Date().getMilliseconds()
        })
    }

    //Mobile detection functions
    Vue.prototype.$isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    Vue.prototype.$innerWidth = function() {
        return window.innerWidth
    }

    Vue.prototype.$innerHeight = function() {
        return window.innerHeight
    }
};
