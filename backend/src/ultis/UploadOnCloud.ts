import cloudinary from './cloudinary';

export const uploadImageOnCloudinary = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return { image_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    console.error(error);
    throw new Error('Cloud upload failed.');
  }
};

export const deleteImageFromCloudinary = async (public_id: string) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log('Image deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Cloud delete failed.');
  }
};
