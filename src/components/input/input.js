import './input.scss'

export default function input() {
    function loadScript(src) {
        let script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.append(script);
      }
      loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js");
      loadScript('/src/components/calendar/jquery.maskedinput.js');
}