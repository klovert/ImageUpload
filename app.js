const imgPreview = document.getElementById('img-preview');
const imgUploader = document.getElementById('img-uploader');
const imgBar = document.getElementById('img-bar');


const CloudBinaryURL = 'https://api.cloudinary.com/v1_1/debwmivrl/image/upload';
const CloudBinary_Preset = 'ybakw2mx';

imgUploader.addEventListener('change', async(e) =>{
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CloudBinary_Preset);

    const res = await axios.post(CloudBinaryURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(e) {
            console.log(Math.round(e.loaded * 100 / e.total));
            const progress = (e.loaded * 100) / e.total;
            imgBar.setAttribute('value',progress);
        }
    });
    console.log(res);
    imgPreview.src = res.data.secure_url;

});