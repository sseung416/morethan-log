import Script from "next/script"
import { CONFIG } from "site.config"

const Scripts: React.FC = () => (
  <>
    <Script id="video-height">{`
      // 변경을 감지할 노드 선택
      const targetNode = document.getElementById("__next");

      // 감지 옵션 (감지할 변경)
      const config = {attributes: true, childList: true, subtree: true };

      // 변경 감지 시 실행할 콜백 함수
      const callback = (mutationList, observer) => {
        if (mutationList[0].type === "childList") { 
          const videos = document.querySelectorAll('.notion-asset-wrapper-video')

          for(let i = 0; i < videos.length; i++) {
            const video = videos[i];
            if (video !== undefined && video !== null) {
              if (video.childNodes[0].style.height === '100%') {
                break;
              } else {
                video.childNodes[0].style.height = '100%';
              }
            }
          }
        }
      }

      // 콜백 함수에 연결된 감지기 인스턴스 생성
      const observer = new MutationObserver(callback);

      // 설정한 변경의 감지 시작
      observer.observe(targetNode, config)

      // 이후 감지 중단 가능
      // observer.disconnect();
    `}
    </Script>
    {CONFIG?.googleAnalytics?.enable === true && (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalytics.config.measurementId}`}
        />
        <Script strategy="lazyOnload" id="ga">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CONFIG.googleAnalytics.config.measurementId}', {
              page_path: window.location.pathname,
            });`}
        </Script>
      </>
    )}
  </>
)

export default Scripts
