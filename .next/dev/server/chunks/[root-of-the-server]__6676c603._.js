module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/Desktop/life-crime-game/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/Desktop/life-crime-game/app/api/cities/seed/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/node_modules/.pnpm/next@16.0.0_@babel+core@7.2_7f620302781efc33b3cd1d7b899d45d5/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/life-crime-game/lib/prisma.ts [app-route] (ecmascript)");
;
;
async function POST() {
    try {
        const cities = [
            // USA - Starting Cities
            {
                name: 'Los Santos',
                country: 'USA',
                description: 'City of angels and crime. High-risk, high-reward opportunities.',
                incomeBonus: 10,
                crimeBonus: 5,
                trainingBonus: 0,
                businessBonus: 0,
                minLevel: 1,
                requiresCar: false,
                requiresPlane: false
            },
            {
                name: 'Liberty City',
                country: 'USA',
                description: 'East coast powerhouse. Perfect for building business empires.',
                incomeBonus: 0,
                crimeBonus: 0,
                trainingBonus: 5,
                businessBonus: 15,
                minLevel: 1,
                requiresCar: false,
                requiresPlane: false
            },
            {
                name: 'Vice City',
                country: 'USA',
                description: 'Tropical paradise with underground connections.',
                incomeBonus: 5,
                crimeBonus: 10,
                trainingBonus: 5,
                businessBonus: 5,
                minLevel: 15,
                requiresCar: true,
                requiresPlane: false
            },
            // UK - Requires Plane
            {
                name: 'London',
                country: 'UK',
                description: 'European crime hub. Sophisticated operations.',
                incomeBonus: 15,
                crimeBonus: 0,
                trainingBonus: 10,
                businessBonus: 10,
                minLevel: 25,
                requiresCar: false,
                requiresPlane: true // Wymaga samolotu
            },
            {
                name: 'Manchester',
                country: 'UK',
                description: 'Industrial powerhouse with underground networks.',
                incomeBonus: 10,
                crimeBonus: 5,
                trainingBonus: 5,
                businessBonus: 5,
                minLevel: 30,
                requiresCar: true,
                requiresPlane: true
            },
            // Japan - Requires Plane
            {
                name: 'Tokyo',
                country: 'Japan',
                description: 'Yakuza territory. Advanced training and operations.',
                incomeBonus: 5,
                crimeBonus: 15,
                trainingBonus: 20,
                businessBonus: 5,
                minLevel: 35,
                requiresCar: false,
                requiresPlane: true
            },
            {
                name: 'Osaka',
                country: 'Japan',
                description: 'Commercial hub with tech opportunities.',
                incomeBonus: 20,
                crimeBonus: 0,
                trainingBonus: 10,
                businessBonus: 15,
                minLevel: 40,
                requiresCar: true,
                requiresPlane: true
            }
        ];
        for (const city of cities){
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].city.upsert({
                where: {
                    name: city.name
                },
                update: city,
                create: city
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Cities seeded successfully',
            count: cities.length
        });
    } catch (error) {
        console.error('Error seeding cities:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$life$2d$crime$2d$game$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$2_7f620302781efc33b3cd1d7b899d45d5$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to seed cities'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6676c603._.js.map