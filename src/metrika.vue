<template>
  <div>
    <noscript>
      <div>
        <img src="https://mc.yandex.ru/watch/97198930" style="position:absolute; left:-9999px;" alt="" />
      </div>
    </noscript>
  </div>
</template>

<script>
export default {
  name: 'YandexMetrika',
  mounted() {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(97198930, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
    `;
    document.head.appendChild(script);
  }
}
</script>
