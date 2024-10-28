import { app } from "./app";
import { env } from "@/env";

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log(`
        🚀 O servidor esta instalado e funcionando ! 🚀
        
        🌐 Ouvindo em http://localhost:3333 🌐
        
        Seu servidor está ativo e pronto para lidar com solicitações! 
        É hora de construir algo incrível! 😎
        `);
})