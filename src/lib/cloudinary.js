import { v2 as cloudinary } from 'cloudinary';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Upload file buffer to Cloudinary
 * @param {Buffer} buffer - File buffer
 * @param {string} filename - Original filename
 * @param {string} folder - Cloudinary folder
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadImageBuffer(buffer, filename, folder = 'products') {
  try {
    // Create temporary file
    const tempPath = join(tmpdir(), `upload-${Date.now()}-${filename}`);
    await writeFile(tempPath, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: `naturemedica/${folder}`,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    // Delete temp file
    await unlink(tempPath);

    console.log('✅ Image uploaded:', result.public_id);

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}

/**
 * Upload multiple buffers
 */
export async function uploadMultipleBuffers(buffers, folder = 'products') {
  const results = [];
  for (const { buffer, filename } of buffers) {
    const result = await uploadImageBuffer(buffer, filename, folder);
    results.push(result);
  }
  return results;
}

/**
 * Delete image
 */
export async function deleteImage(publicId) {
  try {
    if (!publicId) return;
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Deleted: ${publicId}`);
    return result;
  } catch (error) {
    console.error('❌ Delete error:', error);
  }
}
 

/**
 * Upload single image (base64 data URI)
 * @param {string} dataUri - Base64 data URI (e.g., "image/jpeg;base64,...")
 * @param {string} folder - Cloudinary folder
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadImage(dataUri, folder = 'products') {
  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: `naturemedica/${folder}`,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

/**
 * Upload multiple images
 * @param {string[]} dataUris - Array of base64 data URIs
 * @param {string} folder - Cloudinary folder
 * @returns {Promise<Array<{url: string, publicId: string}>>}
 */
export async function uploadMultipleImages(dataUris, folder = 'products') {
  try {
    if (!Array.isArray(dataUris) || dataUris.length === 0) {
      return [];
    }

    console.log(`Uploading ${dataUris.length} images...`);

    const uploadPromises = dataUris.map(dataUri => uploadImage(dataUri, folder));
    const results = await Promise.all(uploadPromises);

    console.log(`✅ Uploaded ${results.length} images`);
    return results;

  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new Error(`Multiple image upload failed: ${error.message}`);
  }
}



export default cloudinary;
