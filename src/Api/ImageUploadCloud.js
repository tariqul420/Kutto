import axios from "axios";

export default async function ImageUploadCloud(imgData) {
    if (!imgData) return;

    const formData = new FormData();
    formData.append('file', imgData);
    formData.append('upload_preset', 'Kutto-Web');

    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dbjlihrjj/image/upload`, formData);
        return res.data.secure_url;
    } catch (err) {
        console.error("Error uploading image:", err);
    }
}
