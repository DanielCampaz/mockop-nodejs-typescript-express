import main from "./main.ts";

async function root() {
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
    };
    await main();
}

root()
    .then(() => {
        console.log("Application started successfully.");
    })
    .catch((error) => {
        console.error("Error starting application:", error);
        process.exit(1);
    });