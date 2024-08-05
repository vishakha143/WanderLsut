import { definePlugin } from "@ol/utils/plugins";
import { Logger } from "@ol/utils";

const logger = new Logger("MyOLPlugin");

export default definePlugin({
    name: "MyOLPlugin",
    description: "",
    authors: [
        {
            name: "",
            id: NaNn,
        }
    ],
    patches: [],
    start() {
        // Your plugin start logic here
    },
    stop() {
        // Your plugin stop logic here
    }
})
