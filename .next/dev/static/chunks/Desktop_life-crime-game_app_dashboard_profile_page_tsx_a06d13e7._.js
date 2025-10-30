(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_7f620302781efc33b3cd1d7b899d45d5/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_7f620302781efc33b3cd1d7b899d45d5/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_7f620302781efc33b3cd1d7b899d45d5/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$lib$2f$character$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/lib/character-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ProfilePage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(122);
    if ($[0] !== "de0634dd93fc28533b1ec18fa7b3a8442b6cb0288bf518f0411c2d71d729f325") {
        for(let $i = 0; $i < 122; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "de0634dd93fc28533b1ec18fa7b3a8442b6cb0288bf518f0411c2d71d729f325";
    }
    const { character, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$lib$2f$character$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacterStore"])();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Player");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const supabase = t0;
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "ProfilePage[useEffect()]": ()=>{
                const getUser = {
                    "ProfilePage[useEffect() > getUser]": async ()=>{
                        const { data: t3 } = await supabase.auth.getUser();
                        const { user } = t3;
                        if (user?.user_metadata?.username) {
                            setUsername(user.user_metadata.username);
                        } else {
                            setUsername(user?.email?.split("@")[0] || "Player");
                        }
                        setEmail(user?.email || "");
                    }
                }["ProfilePage[useEffect() > getUser]"];
                getUser();
            }
        })["ProfilePage[useEffect()]"];
        t2 = [
            supabase
        ];
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    if (isLoading || !character) {
        let t3;
        if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#5cb85c] border-r-transparent mb-4"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                            lineNumber: 64,
                            columnNumber: 100
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#888] text-xs uppercase",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                            lineNumber: 64,
                            columnNumber: 231
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 64,
                    columnNumber: 71
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                lineNumber: 64,
                columnNumber: 12
            }, this);
            $[4] = t3;
        } else {
            t3 = $[4];
        }
        return t3;
    }
    let t3;
    if ($[5] !== character.city) {
        t3 = character.city ? [
            {
                label: "Income Bonus",
                value: `+${character.city.incomeBonus}%`,
                active: character.city.incomeBonus > 0
            },
            {
                label: "Crime Success",
                value: `+${character.city.crimeBonus}%`,
                active: character.city.crimeBonus > 0
            },
            {
                label: "Training Speed",
                value: `+${character.city.trainingBonus}%`,
                active: character.city.trainingBonus > 0
            },
            {
                label: "Business Costs",
                value: `-${character.city.businessBonus}%`,
                active: character.city.businessBonus > 0
            }
        ].filter(_ProfilePageAnonymous) : [];
        $[5] = character.city;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const cityBonuses = t3;
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-bold text-[#fff] mb-6",
            children: "Profile"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section-header",
            children: "Account Information"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Username:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== username) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: username
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 119,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 119,
            columnNumber: 10
        }, this);
        $[10] = username;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Email:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 127,
            columnNumber: 10
        }, this);
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== email) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: email
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 134,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 134,
            columnNumber: 10
        }, this);
        $[13] = email;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "User ID:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== character.userId) {
        t11 = character.userId.slice(0, 8);
        $[16] = character.userId;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    let t12;
    if ($[18] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t10,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value text-[#666] text-xs",
                    children: [
                        t11,
                        "..."
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 157,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[18] = t11;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] !== t12 || $[21] !== t7 || $[22] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: [
                        t7,
                        t9,
                        t12
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 165,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 165,
            columnNumber: 11
        }, this);
        $[20] = t12;
        $[21] = t7;
        $[22] = t9;
        $[23] = t13;
    } else {
        t13 = $[23];
    }
    let t14;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section-header",
            children: "Location"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    let t15;
    if ($[25] !== character.city) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                t14,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: character.city ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ls-info-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ls-info-label",
                                        children: "City:"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 129
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ls-info-value",
                                        children: character.city.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 173
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                lineNumber: 182,
                                columnNumber: 100
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ls-info-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ls-info-label",
                                        children: "Country:"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 268
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ls-info-value",
                                        children: character.city.country
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 315
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                lineNumber: 182,
                                columnNumber: 239
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ls-info-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ls-info-label",
                                        children: "Description:"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 413
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ls-info-value text-xs text-[#888]",
                                        children: character.city.description
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 464
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                                lineNumber: 182,
                                columnNumber: 384
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#888] text-sm",
                        children: "No city selected"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                        lineNumber: 182,
                        columnNumber: 563
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 182,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 182,
            columnNumber: 11
        }, this);
        $[25] = character.city;
        $[26] = t15;
    } else {
        t15 = $[26];
    }
    let t16;
    if ($[27] !== character.city?.name || $[28] !== cityBonuses) {
        t16 = cityBonuses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-header",
                    children: "🌆 City Bonuses"
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 190,
                    columnNumber: 65
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: cityBonuses.map(_ProfilePageCityBonusesMap)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                            lineNumber: 190,
                            columnNumber: 157
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-[#666] mt-3",
                            children: [
                                "💡 These bonuses are automatically applied to all your actions in ",
                                character.city?.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                            lineNumber: 190,
                            columnNumber: 235
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 190,
                    columnNumber: 121
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 190,
            columnNumber: 37
        }, this);
        $[27] = character.city?.name;
        $[28] = cityBonuses;
        $[29] = t16;
    } else {
        t16 = $[29];
    }
    let t17;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section-header",
            children: "\uD83D\uDE97 Assets & Travel"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 199,
            columnNumber: 11
        }, this);
        $[30] = t17;
    } else {
        t17 = $[30];
    }
    let t18;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs text-[#d0d0d0]",
            children: "Driver's License"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 206,
            columnNumber: 11
        }, this);
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    const t19 = `text-sm font-bold ${character.hasDriverLicense ? "text-success" : "text-danger"}`;
    const t20 = character.hasDriverLicense ? "\u2713 Yes" : "\u2717 No";
    let t21;
    if ($[32] !== t19 || $[33] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]",
            children: [
                t18,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: t19,
                    children: t20
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 215,
                    columnNumber: 108
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 215,
            columnNumber: 11
        }, this);
        $[32] = t19;
        $[33] = t20;
        $[34] = t21;
    } else {
        t21 = $[34];
    }
    let t22;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs text-[#d0d0d0]",
            children: "Car"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 224,
            columnNumber: 11
        }, this);
        $[35] = t22;
    } else {
        t22 = $[35];
    }
    const t23 = `text-sm font-bold ${character.hasCar ? "text-success" : "text-danger"}`;
    const t24 = character.hasCar ? "\u2713 Yes" : "\u2717 No";
    let t25;
    if ($[36] !== t23 || $[37] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]",
            children: [
                t22,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: t23,
                    children: t24
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 233,
                    columnNumber: 108
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        $[36] = t23;
        $[37] = t24;
        $[38] = t25;
    } else {
        t25 = $[38];
    }
    let t26;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs text-[#d0d0d0]",
            children: "Private Plane"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 242,
            columnNumber: 11
        }, this);
        $[39] = t26;
    } else {
        t26 = $[39];
    }
    const t27 = `text-sm font-bold ${character.hasPlane ? "text-success" : "text-danger"}`;
    const t28 = character.hasPlane ? "\u2713 Yes" : "\u2717 No";
    let t29;
    if ($[40] !== t27 || $[41] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]",
            children: [
                t26,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: t27,
                    children: t28
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 251,
                    columnNumber: 108
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 251,
            columnNumber: 11
        }, this);
        $[40] = t27;
        $[41] = t28;
        $[42] = t29;
    } else {
        t29 = $[42];
    }
    let t30;
    if ($[43] !== t21 || $[44] !== t25 || $[45] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                t17,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            t21,
                            t25,
                            t29
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                        lineNumber: 260,
                        columnNumber: 80
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 260,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 260,
            columnNumber: 11
        }, this);
        $[43] = t21;
        $[44] = t25;
        $[45] = t29;
        $[46] = t30;
    } else {
        t30 = $[46];
    }
    let t31;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section-header",
            children: "Character Stats"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 270,
            columnNumber: 11
        }, this);
        $[47] = t31;
    } else {
        t31 = $[47];
    }
    let t32;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Level:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 277,
            columnNumber: 11
        }, this);
        $[48] = t32;
    } else {
        t32 = $[48];
    }
    let t33;
    if ($[49] !== character.level) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t32,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.level
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 284,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 284,
            columnNumber: 11
        }, this);
        $[49] = character.level;
        $[50] = t33;
    } else {
        t33 = $[50];
    }
    let t34;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Age:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[51] = t34;
    } else {
        t34 = $[51];
    }
    let t35;
    if ($[52] !== character.age) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t34,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: [
                        character.age,
                        " years"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 299,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[52] = character.age;
        $[53] = t35;
    } else {
        t35 = $[53];
    }
    let t36;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Reputation:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 307,
            columnNumber: 11
        }, this);
        $[54] = t36;
    } else {
        t36 = $[54];
    }
    let t37;
    if ($[55] !== character.reputation) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t36,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.reputation
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 314,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 314,
            columnNumber: 11
        }, this);
        $[55] = character.reputation;
        $[56] = t37;
    } else {
        t37 = $[56];
    }
    let t38;
    if ($[57] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Rank:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 322,
            columnNumber: 11
        }, this);
        $[57] = t38;
    } else {
        t38 = $[57];
    }
    let t39;
    if ($[58] !== character.rank) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t38,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.rank
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 329,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 329,
            columnNumber: 11
        }, this);
        $[58] = character.rank;
        $[59] = t39;
    } else {
        t39 = $[59];
    }
    let t40;
    if ($[60] !== t33 || $[61] !== t35 || $[62] !== t37 || $[63] !== t39) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                t31,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            t33,
                            t35,
                            t37,
                            t39
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                        lineNumber: 337,
                        columnNumber: 80
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 337,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 337,
            columnNumber: 11
        }, this);
        $[60] = t33;
        $[61] = t35;
        $[62] = t37;
        $[63] = t39;
        $[64] = t40;
    } else {
        t40 = $[64];
    }
    let t41;
    if ($[65] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section-header",
            children: "Combat Stats"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 348,
            columnNumber: 11
        }, this);
        $[65] = t41;
    } else {
        t41 = $[65];
    }
    let t42;
    if ($[66] === Symbol.for("react.memo_cache_sentinel")) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Strength:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 355,
            columnNumber: 11
        }, this);
        $[66] = t42;
    } else {
        t42 = $[66];
    }
    let t43;
    if ($[67] !== character.strength) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t42,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.strength
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 362,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 362,
            columnNumber: 11
        }, this);
        $[67] = character.strength;
        $[68] = t43;
    } else {
        t43 = $[68];
    }
    let t44;
    if ($[69] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Defense:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 370,
            columnNumber: 11
        }, this);
        $[69] = t44;
    } else {
        t44 = $[69];
    }
    let t45;
    if ($[70] !== character.defense) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t44,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.defense
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 377,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 377,
            columnNumber: 11
        }, this);
        $[70] = character.defense;
        $[71] = t45;
    } else {
        t45 = $[71];
    }
    let t46;
    if ($[72] === Symbol.for("react.memo_cache_sentinel")) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Speed:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[72] = t46;
    } else {
        t46 = $[72];
    }
    let t47;
    if ($[73] !== character.speed) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t46,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.speed
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 392,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 392,
            columnNumber: 11
        }, this);
        $[73] = character.speed;
        $[74] = t47;
    } else {
        t47 = $[74];
    }
    let t48;
    if ($[75] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Dexterity:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 400,
            columnNumber: 11
        }, this);
        $[75] = t48;
    } else {
        t48 = $[75];
    }
    let t49;
    if ($[76] !== character.dexterity) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t48,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.dexterity
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 407,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 407,
            columnNumber: 11
        }, this);
        $[76] = character.dexterity;
        $[77] = t49;
    } else {
        t49 = $[77];
    }
    let t50;
    if ($[78] !== t43 || $[79] !== t45 || $[80] !== t47 || $[81] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                t41,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            t43,
                            t45,
                            t47,
                            t49
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                        lineNumber: 415,
                        columnNumber: 80
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 415,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 415,
            columnNumber: 11
        }, this);
        $[78] = t43;
        $[79] = t45;
        $[80] = t47;
        $[81] = t49;
        $[82] = t50;
    } else {
        t50 = $[82];
    }
    let t51;
    if ($[83] === Symbol.for("react.memo_cache_sentinel")) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section-header",
            children: "Career"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 426,
            columnNumber: 11
        }, this);
        $[83] = t51;
    } else {
        t51 = $[83];
    }
    let t52;
    if ($[84] === Symbol.for("react.memo_cache_sentinel")) {
        t52 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Education:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 433,
            columnNumber: 11
        }, this);
        $[84] = t52;
    } else {
        t52 = $[84];
    }
    const t53 = character.education || "None";
    let t54;
    if ($[85] !== t53) {
        t54 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t52,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: t53
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 441,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 441,
            columnNumber: 11
        }, this);
        $[85] = t53;
        $[86] = t54;
    } else {
        t54 = $[86];
    }
    let t55;
    if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
        t55 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Job:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 449,
            columnNumber: 11
        }, this);
        $[87] = t55;
    } else {
        t55 = $[87];
    }
    const t56 = character.job || "Unemployed";
    let t57;
    if ($[88] !== t56) {
        t57 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t55,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: t56
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 457,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 457,
            columnNumber: 11
        }, this);
        $[88] = t56;
        $[89] = t57;
    } else {
        t57 = $[89];
    }
    let t58;
    if ($[90] === Symbol.for("react.memo_cache_sentinel")) {
        t58 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Salary:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 465,
            columnNumber: 11
        }, this);
        $[90] = t58;
    } else {
        t58 = $[90];
    }
    let t59;
    if ($[91] !== character.salary) {
        t59 = character.salary.toLocaleString();
        $[91] = character.salary;
        $[92] = t59;
    } else {
        t59 = $[92];
    }
    let t60;
    if ($[93] !== t59) {
        t60 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t58,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: [
                        "$",
                        t59,
                        "/hr"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 480,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 480,
            columnNumber: 11
        }, this);
        $[93] = t59;
        $[94] = t60;
    } else {
        t60 = $[94];
    }
    let t61;
    if ($[95] !== t54 || $[96] !== t57 || $[97] !== t60) {
        t61 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                t51,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: [
                        t54,
                        t57,
                        t60
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 488,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 488,
            columnNumber: 11
        }, this);
        $[95] = t54;
        $[96] = t57;
        $[97] = t60;
        $[98] = t61;
    } else {
        t61 = $[98];
    }
    let t62;
    if ($[99] === Symbol.for("react.memo_cache_sentinel")) {
        t62 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section-header",
            children: "Criminal Record"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 498,
            columnNumber: 11
        }, this);
        $[99] = t62;
    } else {
        t62 = $[99];
    }
    let t63;
    if ($[100] === Symbol.for("react.memo_cache_sentinel")) {
        t63 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Crimes Committed:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 505,
            columnNumber: 11
        }, this);
        $[100] = t63;
    } else {
        t63 = $[100];
    }
    let t64;
    if ($[101] !== character.crimesCommitted) {
        t64 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t63,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value text-danger",
                    children: character.crimesCommitted
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 512,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 512,
            columnNumber: 11
        }, this);
        $[101] = character.crimesCommitted;
        $[102] = t64;
    } else {
        t64 = $[102];
    }
    let t65;
    if ($[103] === Symbol.for("react.memo_cache_sentinel")) {
        t65 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Jail Time:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 520,
            columnNumber: 11
        }, this);
        $[103] = t65;
    } else {
        t65 = $[103];
    }
    let t66;
    if ($[104] !== character.jailTime) {
        t66 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t65,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value text-danger",
                    children: [
                        character.jailTime,
                        " hours"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 527,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 527,
            columnNumber: 11
        }, this);
        $[104] = character.jailTime;
        $[105] = t66;
    } else {
        t66 = $[105];
    }
    let t67;
    if ($[106] === Symbol.for("react.memo_cache_sentinel")) {
        t67 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "ls-info-label",
            children: "Criminal Rep:"
        }, void 0, false, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 535,
            columnNumber: 11
        }, this);
        $[106] = t67;
    } else {
        t67 = $[106];
    }
    let t68;
    if ($[107] !== character.criminalReputation) {
        t68 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-info-row",
            children: [
                t67,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ls-info-value",
                    children: character.criminalReputation
                }, void 0, false, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 542,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 542,
            columnNumber: 11
        }, this);
        $[107] = character.criminalReputation;
        $[108] = t68;
    } else {
        t68 = $[108];
    }
    let t69;
    if ($[109] !== t64 || $[110] !== t66 || $[111] !== t68) {
        t69 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ls-section",
            children: [
                t62,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ls-section-content",
                    children: [
                        t64,
                        t66,
                        t68
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 550,
                    columnNumber: 44
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 550,
            columnNumber: 11
        }, this);
        $[109] = t64;
        $[110] = t66;
        $[111] = t68;
        $[112] = t69;
    } else {
        t69 = $[112];
    }
    let t70;
    if ($[113] !== t13 || $[114] !== t15 || $[115] !== t16 || $[116] !== t30 || $[117] !== t40 || $[118] !== t50 || $[119] !== t61 || $[120] !== t69) {
        t70 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4 max-w-7xl mx-auto fade-in",
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                        t13,
                        t15,
                        t16,
                        t30,
                        t40,
                        t50,
                        t61,
                        t69
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                    lineNumber: 560,
                    columnNumber: 68
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
            lineNumber: 560,
            columnNumber: 11
        }, this);
        $[113] = t13;
        $[114] = t15;
        $[115] = t16;
        $[116] = t30;
        $[117] = t40;
        $[118] = t50;
        $[119] = t61;
        $[120] = t69;
        $[121] = t70;
    } else {
        t70 = $[121];
    }
    return t70;
}
_s(ProfilePage, "m1obtZgu74CWEeVZsOzWS2HLTpI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$lib$2f$character$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCharacterStore"]
    ];
});
_c = ProfilePage;
function _ProfilePageCityBonusesMap(bonus, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-2 bg-[#1a1a1a] border border-[#2a2a2a]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-[#d0d0d0]",
                children: bonus.label
            }, void 0, false, {
                fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                lineNumber: 576,
                columnNumber: 114
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-bold text-success",
                children: bonus.value
            }, void 0, false, {
                fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
                lineNumber: 576,
                columnNumber: 175
            }, this)
        ]
    }, index, true, {
        fileName: "[project]/Desktop/life-crime-game/app/dashboard/profile/page.tsx",
        lineNumber: 576,
        columnNumber: 10
    }, this);
}
function _ProfilePageAnonymous(b) {
    return b.active;
}
var _c;
__turbopack_context__.k.register(_c, "ProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_life-crime-game_app_dashboard_profile_page_tsx_a06d13e7._.js.map