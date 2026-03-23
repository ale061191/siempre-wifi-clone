const fs = require('fs');
const html = fs.readFileSync('holafly-clone/shop.html', 'utf8');
console.log("Includes <script>...:", html.includes('<script>\ndocument.addEventListener("click"'));
console.log("Includes Routing intercepts:", html.includes('Routing intercepts'));
console.log("Includes </body>:", html.includes('</body>'));
