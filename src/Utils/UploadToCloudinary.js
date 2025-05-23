// const cloud_name = "dzxhzpc1h";
// const upload_preset = "xzalCloud";

// export const UploadToCloudinary = async (pics, fileType) => {
//     if(pics && fileType) {
//         const data = new FormData();
//         data.append("file", pics);
//         data.append("upload_preset", upload_preset);
//         data.append("cloud_name", cloud_name);
//         data.append("folder", fileType);


//         const res = await fetch(
//             `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
//             {
//                 method: "POST",
//                 body: data,
//             }
//         );

//         const fileData = await res.json();
//         console.log("res_ _ _ ", fileData.url)
//         return fileData.url;

//     } else {
//         console.error("error........")

//     }

// }
 
 
const cloud_name = "dzxhzpc1h";
const upload_preset = "xzalCloud";

export const UploadToCloudinary = async (pics, fileType) => {
    if (!pics || !fileType) {
        console.error("Missing required parameters");
        throw new Error("Both file and fileType are required");
    }

    try {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);
        data.append("folder", fileType);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType === 'image' ? 'image' : 'video'}/upload`,
            {
                method: "POST",
                body: data,
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Upload failed");
        }

        const fileData = await res.json();
        console.log("Cloudinary response:", fileData);
        
        // Return secure URL if available, otherwise regular URL
        return fileData.secure_url || fileData.url;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error; // Re-throw to handle in calling function
    }
};