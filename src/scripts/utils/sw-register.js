import {Workbox} from "workbox-window";

const swRegister = async () => {
    if (!("serviceWorker" in navigator)) {
        console.log("Service worker tidak didukung browser ini.");
        return;
    }

    const wb = new Workbox("./sw.bundle.js");

    try {
        await wb.register();
        console.log("Pendaftaran ServiceWorker berhasil");
    } catch (error) {
        console.log("Pendaftaran ServiceWorker gagal", error);
    }
};

export default swRegister;
