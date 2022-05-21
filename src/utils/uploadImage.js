import axios from "axios";
const { REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_PRESET } = process.env;

export const uploadImage = async (file) => {
  const fileData = new FormData();
  fileData.append("file", file);
  fileData.append("upload_preset", REACT_APP_UPLOAD_PRESET);
  const {
    data: { secure_url },
  } = await axios({
    transformRequest: [
      (data, headers) => {
        delete headers.common.Authorization;
        return data;
      },
    ],
    method: "POST",
    url: `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
    data: fileData,
  });
  return secure_url;
};
