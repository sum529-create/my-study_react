import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.2;
}
a{
  text-decoration: none;
  color:inherit;
}

input, select{
  max-width: 100%;
  overflow : hidden;
  width: 420px;
  height: 36px;
  padding: 0 10px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  border:1px solid #bbb;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
}
select {
  width: calc(20% - 32px / 3);
  max-width: none;
  padding-right: 36px;
}

button, .button {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  background: #353b48;
  color: #FFF;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-color: #353b48;
  width:120px;
  height: 40px;
  min-width: 100px;
  border-radius: 3px;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
