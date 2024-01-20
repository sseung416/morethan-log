import Script from "next/script"
import { CONFIG } from "site.config"

const Scripts: React.FC = () => (
  <>
    <Script id="video-height">{`
      const scrollHandler = () => {
  const videoWrapper = document.querySelector('.notion-asset-wrapper-video');
  
  if (videoWrapper !== undefined && videoWrapper !== null) {
    if (videoWrapper.childNodes[0].style.height !== '100%') {
      videoWrapper.childNodes[0].style.height = '100%';
      console.log('test');

      // 스크롤 이벤트 리스너를 제거
      document.removeEventListener('scroll', scrollHandler);
    }
  }
};

// 스크롤 이벤트 리스너를 등록
document.addEventListener('scroll', scrollHandler);

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
