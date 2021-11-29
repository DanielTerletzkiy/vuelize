//Imports store
import store from "./store";

//Imports Unicon
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.es'
import * as uc from 'vue-unicons/dist/icons'

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
import DToolbar from "./components/app/toolbar/Toolbar.vue";
import DNavigationBar from "./components/app/navigation/NavigationBar.vue";

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
    Vue.component("d-toolbar", DToolbar);
    Vue.component("d-navigation-bar", DNavigationBar);


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


    //Imports FunctionWrapper
    Vue.component('d-function-wrapper', DFunctionWrapper)


    //Vue mixin
    Vue.mixin({
        //Default props
        props: {
            rootDiv: {type: String, default: 'div'},
            classes: Array,
            color: String,

            rounded: {type: String, default: 'lg'},
            elevation: [String, Number, undefined],
            outlined: Boolean,
            inlined: Boolean,
            depressed: Boolean,

            link: {type: String, default: null}
        }
    })


    //Click outside listener
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
        return (yiq >= 160) ? 'black' : 'white';

    }

    //Mobile detection functions
    Vue.prototype.$isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
};
