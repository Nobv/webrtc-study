'use strict';

var videoStreamInUse;

document.querySelector("#camera").addEventListener("click", async () => {
    console.log("starting camera...");

    const videoDevices = await getVideoDevices();

    if (videoDevices.lenght < 1) {
        throw new Error("");
    }

    await getUserMedia({
        audio:false,
        video:{
            //deviceId: videoDevices[0].deviceId
            facingMode: document.querySelector("#facing-mode").value
        }
    });
});

document.querySelector("#snapshot").addEventListener("click", () => {
    console.log("starting shapshot...");

    const video = document.querySelector("video");
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, video.width, video.height);
    document.querySelector("img").src = canvas.toDataURL("image/webp");

});

document.querySelector("#stop").addEventListener("click", () => {
    console.log("finishing camera...");

    videoStreamInUse.getVideoTracks()[0].stop()
});


async function enumerateDevices() {
    return await navigator.mediaDevices.enumerateDevices();
}

async function getVideoDevices() {
    const devices = await enumerateDevices();

    return devices.filter((device) => {
        return device.kind === "videoinput";
    });
}

async function getUserMedia(constrains) {
    const stream = await navigator.mediaDevices.getUserMedia(constrains)
    document.querySelector("video").srcObject = stream;
    videoStreamInUse = stream;
}
