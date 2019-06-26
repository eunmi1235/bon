
//모바일 여부
function detectMobile() {
    var filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {

        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            //mobile alert('mobile 접속'); 
            return true;
        } else {
            return false;
        } 
     }

}

//SNS 공유
function snsShare(type, title, url, img) {

    var shareUrl = "";
    var option = "width=300, height=300,toolbar=yes,directories=yes,status=yes,menubar=yes,resizable=yes,scrollbars=yes";
    if (type == "facebook") {
        shareUrl = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title);
        /*https://www.facebook.com/dialog/share?
        app_id = 145634995501895
        & display=popup &
        href = https % 3A % 2F % 2Fdevelopers.facebook.com % 2Fdocs % 2F
                    & redirect_uri=https % 3A % 2F % 2Fdevelopers.facebook.com % 2Ftools % 2Fexplorer
                    */
    } else if (type == "band") {
        //shareUrl = "http://www.band.us/plugin/share?body=" + encodeURIComponent(title) + '%0A' + encodeURIComponent(url);
        shareUrl = "http://band.us/plugin/share?body=" + encodeURIComponent(title) + "&route=" + encodeURIComponent(url);

    } else if (type == "kakaostory") {
        shareUrl = "https://story.kakao.com/share?url=" + encodeURIComponent(url) + "&text=" + title;
        
        /*Kakao.Story.share({
            url: url,
            text: title
        });*/
    }
    window.open(shareUrl, 'snsShare', option);
    /**
     * 가이드
     * 
     * https://developers.facebook.com/docs/sharing/reference/share-dialog?locale=ko_KR
     * 
     * https://developers.kakao.com/docs/js/kakaostory-share
     * 
     * https://developers.band.us/develop/guide/share
     * bandapp://create/post?text=<문자열>&route=<밴드 공유 버튼을 사용하는 서비스의 도메인>
     * 
     * 
     * */
}