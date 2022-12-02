import { VideoModel } from "../models/video.model";
import { VideoBox } from "../models/video-box.model";


export const MapTo = (video: VideoModel): VideoBox => {
  return {
    id: video.id,
    imgUrl: video.imageUrl,
  }
}
