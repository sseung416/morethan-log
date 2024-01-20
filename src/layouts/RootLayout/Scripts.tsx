import Script from "next/script"
import { CONFIG } from "site.config"

const Scripts: React.FC = () => (
  <>
  <Script id="dynamic-video">
  {`
  document.addEventListener('scroll', () => {
    let testA = document.querySelector('.notion-asset-wrapper-video')
    
    if(testA !== undefined && testA !== null) {
        if(testA.childNodes[0].style.height !== '100%') {
            testA.childNodes[0].style.height = '100%'
            console.log('test')
        }
    }
})
  
  
  // window.addEventListener('load', function() {
  //     console.log('전체 페이지 및 자원이 로드되었습니다.');
  //     const elements = document.getElementsByClassName('notion-asset-wrapper-video');
  //     console.log(elements);
  //     for (let i = 0; i < elements.length; i++) {
  //       const divs = elements[i].getElementsByTagName("div");
  //       console.log(divs);
  //       if (divs.length > 0) {
  //         const videoDiv = divs[0];
  //         videoDiv.style.height = '100%';
  //       }
  //     }
  //   });
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
