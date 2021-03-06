import {API_URL} from "../../config";


const CACHE_URL = `${API_URL}/cache`;

export default {

  getDownloadLink(cacheId, format) {
    return `${CACHE_URL}/${cacheId}?format=${format}`;
  }

}
