import axios from "axios";

export const uploadImage = async (file) => {
  const fileData = new FormData();
  fileData.append("file", file);
  fileData.append("upload_preset", "w1pwqcqw");
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
    url: "https://api.cloudinary.com/v1_1/moments-social/image/upload",
    data: fileData,
  });
  return secure_url;
};
