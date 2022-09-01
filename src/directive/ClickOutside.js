export default function (app) {
    app.directive("click-outside", {
        mounted: function (el, binding) {
            const ourClickEventHandler = (event) => {
                if (!el.contains(event.target) && el !== event.target) {
                    binding.value(event);
                }
            };
            el.__vueClickEventHandler__ = ourClickEventHandler;
            setTimeout(() => {
                document.addEventListener("click", ourClickEventHandler);
            });
        },
        unmounted: function (el) {
            document.removeEventListener("click", el.__vueClickEventHandler__);
        }
    });
}
//# sourceMappingURL=ClickOutside.js.map