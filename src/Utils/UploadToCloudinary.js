const cloud_name = "dzxhzpc1h";
const upload_preset = "xzalCloud";

export const UploadToCloudinary = async (pics, fileType) => {
    if(pics && fileType) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);
        data.append("folder", fileType);


        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
            {
                method: "POST",
                body: data,
            }
        );

        const fileData = await res.json();
        console.log("res_ _ _ ", fileData.url)
        return fileData.url;

    } else {
        console.error("error........")

    }

}

 