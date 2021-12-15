import {apiUrl} from "../config";

const Helper = {}

Helper.getUrlDetail = (url) => {
    const match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        href: url,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

const urlDetail = Helper.getUrlDetail(apiUrl);

Helper.getImageUrl = (imgSrc) => {
    return `${urlDetail.protocol}//${urlDetail.host}/${imgSrc}`;
}

export default Helper
