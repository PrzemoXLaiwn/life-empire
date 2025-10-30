module.exports = [
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "hasA11yProp",
    ()=>hasA11yProp,
    "mergeClasses",
    ()=>mergeClasses,
    "toCamelCase",
    ()=>toCamelCase,
    "toKebabCase",
    ()=>toKebabCase,
    "toPascalCase",
    ()=>toPascalCase
]);
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_7f620302781efc33b3cd1d7b899d45d5/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_7f620302781efc33b3cd1d7b899d45d5/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/Icon.js [app-ssr] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LayoutDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "7",
            height: "9",
            x: "3",
            y: "3",
            rx: "1",
            key: "10lvy0"
        }
    ],
    [
        "rect",
        {
            width: "7",
            height: "5",
            x: "14",
            y: "3",
            rx: "1",
            key: "16une8"
        }
    ],
    [
        "rect",
        {
            width: "7",
            height: "9",
            x: "14",
            y: "12",
            rx: "1",
            key: "1hutg5"
        }
    ],
    [
        "rect",
        {
            width: "7",
            height: "5",
            x: "3",
            y: "16",
            rx: "1",
            key: "ldoo1y"
        }
    ]
];
const LayoutDashboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("layout-dashboard", __iconNode);
;
 //# sourceMappingURL=layout-dashboard.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutDashboard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
            key: "975kel"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "7",
            r: "4",
            key: "17ys0d"
        }
    ]
];
const User = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("user", __iconNode);
;
 //# sourceMappingURL=user.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChartColumn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 3v16a2 2 0 0 0 2 2h16",
            key: "c24i48"
        }
    ],
    [
        "path",
        {
            d: "M18 17V9",
            key: "2bz60n"
        }
    ],
    [
        "path",
        {
            d: "M13 17V5",
            key: "1frdt8"
        }
    ],
    [
        "path",
        {
            d: "M8 17v-3",
            key: "17ska0"
        }
    ]
];
const ChartColumn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chart-column", __iconNode);
;
 //# sourceMappingURL=chart-column.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarChart3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Briefcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
            key: "jecpp"
        }
    ],
    [
        "rect",
        {
            width: "20",
            height: "14",
            x: "2",
            y: "6",
            rx: "2",
            key: "i6l2r4"
        }
    ]
];
const Briefcase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("briefcase", __iconNode);
;
 //# sourceMappingURL=briefcase.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Briefcase",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>GraduationCap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
            key: "j76jl0"
        }
    ],
    [
        "path",
        {
            d: "M22 10v6",
            key: "1lu8f3"
        }
    ],
    [
        "path",
        {
            d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
            key: "1r8lef"
        }
    ]
];
const GraduationCap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("graduation-cap", __iconNode);
;
 //# sourceMappingURL=graduation-cap.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript) <export default as GraduationCap>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraduationCap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Building2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 12h4",
            key: "a56b0p"
        }
    ],
    [
        "path",
        {
            d: "M10 8h4",
            key: "1sr2af"
        }
    ],
    [
        "path",
        {
            d: "M14 21v-3a2 2 0 0 0-4 0v3",
            key: "1rgiei"
        }
    ],
    [
        "path",
        {
            d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
            key: "secmi2"
        }
    ],
    [
        "path",
        {
            d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
            key: "16ra0t"
        }
    ]
];
const Building2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("building-2", __iconNode);
;
 //# sourceMappingURL=building-2.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Building2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Target
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "6",
            key: "1vlfrh"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "2",
            key: "1c9p78"
        }
    ]
];
const Target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("target", __iconNode);
;
 //# sourceMappingURL=target.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript) <export default as Target>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Target",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/swords.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Swords
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "polyline",
        {
            points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5",
            key: "1hfsw2"
        }
    ],
    [
        "line",
        {
            x1: "13",
            x2: "19",
            y1: "19",
            y2: "13",
            key: "1vrmhu"
        }
    ],
    [
        "line",
        {
            x1: "16",
            x2: "20",
            y1: "16",
            y2: "20",
            key: "1bron3"
        }
    ],
    [
        "line",
        {
            x1: "19",
            x2: "21",
            y1: "21",
            y2: "19",
            key: "13pww6"
        }
    ],
    [
        "polyline",
        {
            points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5",
            key: "hbey2j"
        }
    ],
    [
        "line",
        {
            x1: "5",
            x2: "9",
            y1: "14",
            y2: "18",
            key: "1hf58s"
        }
    ],
    [
        "line",
        {
            x1: "7",
            x2: "4",
            y1: "17",
            y2: "20",
            key: "pidxm4"
        }
    ],
    [
        "line",
        {
            x1: "3",
            x2: "5",
            y1: "19",
            y2: "21",
            key: "1pehsh"
        }
    ]
];
const Swords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("swords", __iconNode);
;
 //# sourceMappingURL=swords.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/swords.js [app-ssr] (ecmascript) <export default as Swords>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Swords",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/swords.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Users
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "path",
        {
            d: "M16 3.128a4 4 0 0 1 0 7.744",
            key: "16gr8j"
        }
    ],
    [
        "path",
        {
            d: "M22 21v-2a4 4 0 0 0-3-3.87",
            key: "kshegd"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ]
];
const Users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("users", __iconNode);
;
 //# sourceMappingURL=users.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Users",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ShoppingBag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 10a4 4 0 0 1-8 0",
            key: "1ltviw"
        }
    ],
    [
        "path",
        {
            d: "M3.103 6.034h17.794",
            key: "awc11p"
        }
    ],
    [
        "path",
        {
            d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
            key: "o988cm"
        }
    ]
];
const ShoppingBag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("shopping-bag", __iconNode);
;
 //# sourceMappingURL=shopping-bag.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShoppingBag",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Trophy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",
            key: "1n3hpd"
        }
    ],
    [
        "path",
        {
            d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",
            key: "rfe1zi"
        }
    ],
    [
        "path",
        {
            d: "M18 9h1.5a1 1 0 0 0 0-5H18",
            key: "7xy6bh"
        }
    ],
    [
        "path",
        {
            d: "M4 22h16",
            key: "57wxv0"
        }
    ],
    [
        "path",
        {
            d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
            key: "1mhfuq"
        }
    ],
    [
        "path",
        {
            d: "M6 9H4.5a1 1 0 0 1 0-5H6",
            key: "tex48p"
        }
    ]
];
const Trophy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("trophy", __iconNode);
;
 //# sourceMappingURL=trophy.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trophy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>House
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
            key: "5wwlr5"
        }
    ],
    [
        "path",
        {
            d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            key: "r6nss1"
        }
    ]
];
const House = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("house", __iconNode);
;
 //# sourceMappingURL=house.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Home",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/car.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Car
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
            key: "5owen"
        }
    ],
    [
        "circle",
        {
            cx: "7",
            cy: "17",
            r: "2",
            key: "u2ysq9"
        }
    ],
    [
        "path",
        {
            d: "M9 17h6",
            key: "r8uit2"
        }
    ],
    [
        "circle",
        {
            cx: "17",
            cy: "17",
            r: "2",
            key: "axvx0g"
        }
    ]
];
const Car = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("car", __iconNode);
;
 //# sourceMappingURL=car.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/car.js [app-ssr] (ecmascript) <export default as Car>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Car",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/car.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/warehouse.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Warehouse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11",
            key: "pb2vm6"
        }
    ],
    [
        "path",
        {
            d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
            key: "doq5xv"
        }
    ],
    [
        "path",
        {
            d: "M6 13h12",
            key: "yf64js"
        }
    ],
    [
        "path",
        {
            d: "M6 17h12",
            key: "1jwigz"
        }
    ]
];
const Warehouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("warehouse", __iconNode);
;
 //# sourceMappingURL=warehouse.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/warehouse.js [app-ssr] (ecmascript) <export default as Warehouse>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Warehouse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/warehouse.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>TrendingUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 7h6v6",
            key: "box55l"
        }
    ],
    [
        "path",
        {
            d: "m22 7-8.5 8.5-5-5L2 17",
            key: "1t1m79"
        }
    ]
];
const TrendingUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("trending-up", __iconNode);
;
 //# sourceMappingURL=trending-up.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendingUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/dumbbell.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Dumbbell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
            key: "9m4mmf"
        }
    ],
    [
        "path",
        {
            d: "m2.5 21.5 1.4-1.4",
            key: "17g3f0"
        }
    ],
    [
        "path",
        {
            d: "m20.1 3.9 1.4-1.4",
            key: "1qn309"
        }
    ],
    [
        "path",
        {
            d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
            key: "1t2c92"
        }
    ],
    [
        "path",
        {
            d: "m9.6 14.4 4.8-4.8",
            key: "6umqxw"
        }
    ]
];
const Dumbbell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("dumbbell", __iconNode);
;
 //# sourceMappingURL=dumbbell.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/dumbbell.js [app-ssr] (ecmascript) <export default as Dumbbell>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dumbbell",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dumbbell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dumbbell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/dumbbell.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/hospital.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Hospital
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 7v4",
            key: "xawao1"
        }
    ],
    [
        "path",
        {
            d: "M14 21v-3a2 2 0 0 0-4 0v3",
            key: "1rgiei"
        }
    ],
    [
        "path",
        {
            d: "M14 9h-4",
            key: "1w2s2s"
        }
    ],
    [
        "path",
        {
            d: "M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",
            key: "1tthqt"
        }
    ],
    [
        "path",
        {
            d: "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16",
            key: "dw4p4i"
        }
    ]
];
const Hospital = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("hospital", __iconNode);
;
 //# sourceMappingURL=hospital.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/hospital.js [app-ssr] (ecmascript) <export default as Hospital>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hospital",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hospital$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hospital$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/hospital.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/pill.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Pill
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",
            key: "wa1lgi"
        }
    ],
    [
        "path",
        {
            d: "m8.5 8.5 7 7",
            key: "rvfmvr"
        }
    ]
];
const Pill = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("pill", __iconNode);
;
 //# sourceMappingURL=pill.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/pill.js [app-ssr] (ecmascript) <export default as Pill>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pill",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/pill.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shirt.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Shirt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
            key: "1wgbhj"
        }
    ]
];
const Shirt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("shirt", __iconNode);
;
 //# sourceMappingURL=shirt.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shirt.js [app-ssr] (ecmascript) <export default as Shirt>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Shirt",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shirt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shirt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shirt.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/plane.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Plane
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
            key: "1v9wt8"
        }
    ]
];
const Plane = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("plane", __iconNode);
;
 //# sourceMappingURL=plane.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/plane.js [app-ssr] (ecmascript) <export default as Plane>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Plane",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plane$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plane$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/plane.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MapPin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
];
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("map-pin", __iconNode);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>UserPlus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ],
    [
        "line",
        {
            x1: "19",
            x2: "19",
            y1: "8",
            y2: "14",
            key: "1bvyxn"
        }
    ],
    [
        "line",
        {
            x1: "22",
            x2: "16",
            y1: "11",
            y2: "11",
            key: "1shjgl"
        }
    ]
];
const UserPlus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("user-plus", __iconNode);
;
 //# sourceMappingURL=user-plus.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript) <export default as UserPlus>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserPlus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MessageSquare
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
            key: "18887p"
        }
    ]
];
const MessageSquare = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("message-square", __iconNode);
;
 //# sourceMappingURL=message-square.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MessageSquare",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Mail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
            key: "132q7q"
        }
    ],
    [
        "rect",
        {
            x: "2",
            y: "4",
            width: "20",
            height: "16",
            rx: "2",
            key: "izxlao"
        }
    ]
];
const Mail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("mail", __iconNode);
;
 //# sourceMappingURL=mail.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mail",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Shield
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }
    ]
];
const Shield = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("shield", __iconNode);
;
 //# sourceMappingURL=shield.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Shield",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Zap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
];
const Zap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("zap", __iconNode);
;
 //# sourceMappingURL=zap.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Zap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>BookOpen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 7v14",
            key: "1akyts"
        }
    ],
    [
        "path",
        {
            d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
            key: "ruj8y"
        }
    ]
];
const BookOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("book-open", __iconNode);
;
 //# sourceMappingURL=book-open.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookOpen",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/hammer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Hammer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",
            key: "1hayfq"
        }
    ],
    [
        "path",
        {
            d: "m18 15 4-4",
            key: "16gjal"
        }
    ],
    [
        "path",
        {
            d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
            key: "15ts47"
        }
    ]
];
const Hammer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("hammer", __iconNode);
;
 //# sourceMappingURL=hammer.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/hammer.js [app-ssr] (ecmascript) <export default as Hammer>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hammer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/hammer.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/factory.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Factory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 16h.01",
            key: "1drbdi"
        }
    ],
    [
        "path",
        {
            d: "M16 16h.01",
            key: "1f9h7w"
        }
    ],
    [
        "path",
        {
            d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
            key: "1iv0i2"
        }
    ],
    [
        "path",
        {
            d: "M8 16h.01",
            key: "18s6g9"
        }
    ]
];
const Factory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("factory", __iconNode);
;
 //# sourceMappingURL=factory.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/factory.js [app-ssr] (ecmascript) <export default as Factory>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Factory",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/factory.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>DollarSign
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "2",
            y2: "22",
            key: "7eqyqh"
        }
    ],
    [
        "path",
        {
            d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
            key: "1b0p4s"
        }
    ]
];
const DollarSign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("dollar-sign", __iconNode);
;
 //# sourceMappingURL=dollar-sign.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DollarSign",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Package
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
            key: "1a0edw"
        }
    ],
    [
        "path",
        {
            d: "M12 22V12",
            key: "d0xqtd"
        }
    ],
    [
        "polyline",
        {
            points: "3.29 7 12 12 20.71 7",
            key: "ousv84"
        }
    ],
    [
        "path",
        {
            d: "m7.5 4.27 9 5.15",
            key: "1c824w"
        }
    ]
];
const Package = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("package", __iconNode);
;
 //# sourceMappingURL=package.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Package",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5",
            key: "slp6dd"
        }
    ],
    [
        "path",
        {
            d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
            key: "o0xfot"
        }
    ],
    [
        "path",
        {
            d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05",
            key: "wn3emo"
        }
    ]
];
const Store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("store", __iconNode);
;
 //# sourceMappingURL=store.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/store.js [app-ssr] (ecmascript) <export default as Store>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Store",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/store.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-down", __iconNode);
;
 //# sourceMappingURL=chevron-down.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/power.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Power
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 2v10",
            key: "mnfbl"
        }
    ],
    [
        "path",
        {
            d: "M18.4 6.6a9 9 0 1 1-12.77.04",
            key: "obofu9"
        }
    ]
];
const Power = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("power", __iconNode);
;
 //# sourceMappingURL=power.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/power.js [app-ssr] (ecmascript) <export default as Power>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Power",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$power$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$power$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/power.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Crown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
            key: "1vdc57"
        }
    ],
    [
        "path",
        {
            d: "M5 21h14",
            key: "11awu3"
        }
    ]
];
const Crown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("crown", __iconNode);
;
 //# sourceMappingURL=crown.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript) <export default as Crown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Crown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/crown.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Heart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
            key: "mvr1a0"
        }
    ]
];
const Heart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("heart", __iconNode);
;
 //# sourceMappingURL=heart.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>X
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("x", __iconNode);
;
 //# sourceMappingURL=x.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Minus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ]
];
const Minus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("minus", __iconNode);
;
 //# sourceMappingURL=minus.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Minus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/skull.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Skull
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12.5 17-.5-1-.5 1h1z",
            key: "3me087"
        }
    ],
    [
        "path",
        {
            d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
            key: "1o5pge"
        }
    ],
    [
        "circle",
        {
            cx: "15",
            cy: "12",
            r: "1",
            key: "1tmaij"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "12",
            r: "1",
            key: "1vctgf"
        }
    ]
];
const Skull = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("skull", __iconNode);
;
 //# sourceMappingURL=skull.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/skull.js [app-ssr] (ecmascript) <export default as Skull>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skull",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/skull.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Flame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
            key: "1slcih"
        }
    ]
];
const Flame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("flame", __iconNode);
;
 //# sourceMappingURL=flame.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript) <export default as Flame>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Flame",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Star
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("star", __iconNode);
;
 //# sourceMappingURL=star.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Star",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/diamond.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Diamond
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
            key: "1f1r0c"
        }
    ]
];
const Diamond = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("diamond", __iconNode);
;
 //# sourceMappingURL=diamond.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/diamond.js [app-ssr] (ecmascript) <export default as Diamond>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Diamond",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$diamond$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$diamond$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/diamond.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/rocket.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Rocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
            key: "m3kijz"
        }
    ],
    [
        "path",
        {
            d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
            key: "1fmvmk"
        }
    ],
    [
        "path",
        {
            d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",
            key: "1f8sc4"
        }
    ],
    [
        "path",
        {
            d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
            key: "qeys4"
        }
    ]
];
const Rocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("rocket", __iconNode);
;
 //# sourceMappingURL=rocket.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/rocket.js [app-ssr] (ecmascript) <export default as Rocket>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Rocket",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/rocket.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Bot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 8V4H8",
            key: "hb8ula"
        }
    ],
    [
        "rect",
        {
            width: "16",
            height: "12",
            x: "4",
            y: "8",
            rx: "2",
            key: "enze0r"
        }
    ],
    [
        "path",
        {
            d: "M2 14h2",
            key: "vft8re"
        }
    ],
    [
        "path",
        {
            d: "M20 14h2",
            key: "4cs60a"
        }
    ],
    [
        "path",
        {
            d: "M15 13v2",
            key: "1xurst"
        }
    ],
    [
        "path",
        {
            d: "M9 13v2",
            key: "rq6x2g"
        }
    ]
];
const Bot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("bot", __iconNode);
;
 //# sourceMappingURL=bot.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/ship.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Ship
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 10.189V14",
            key: "1p8cqu"
        }
    ],
    [
        "path",
        {
            d: "M12 2v3",
            key: "qbqxhf"
        }
    ],
    [
        "path",
        {
            d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6",
            key: "qpkstq"
        }
    ],
    [
        "path",
        {
            d: "M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76",
            key: "7tigtc"
        }
    ],
    [
        "path",
        {
            d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
            key: "1924j5"
        }
    ]
];
const Ship = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("ship", __iconNode);
;
 //# sourceMappingURL=ship.js.map
}),
"[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/ship.js [app-ssr] (ecmascript) <export default as Ship>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ship",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ship$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$548$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ship$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/lucide-react@0.548.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/ship.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=31d54_lucide-react_dist_esm_19644e77._.js.map