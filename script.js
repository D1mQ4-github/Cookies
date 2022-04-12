document.addEventListener('DOMContentLoaded', function() {

    window.Cookie = (function() {
        function Cookie() {
            this.cookies = document.cookie
                    .split(';').map(ck => {
                        const parts = ck.split('=');
                        const name = parts[0];
                        const value = parts[1];

                        return {name, value}
                    });
        }

        Cookie.prototype = Object.assign({}, Cookie.prototype, {
            getCookies(name = null) {
                if (!name)   return this.cookies

                return this.cookies.filter(item => item.name === name);
            },

            setCookie([...object]) {
                object.forEach(cookie => {
                    const name = encodeURIComponent(cookie.name);
                    const value = encodeURIComponent(cookie.value);
                    const path = cookie.path ? cookie.path : '/';
                    const date = new Date(Date.now() + parseInt(cookie.expDate)).toUTCString();
                    let query = `${name}=${value};path=${path};`;
                    query += (cookie.expDate) ? `expires=${date}` : `max-age=3600`

                    document.cookie = query;
                });
            }
        });

        return Cookie;
    })();


    const cks = new Cookie();
    cks.setCookie([
        {
            name: 'user',
            value: 'John',
            path: '/',
            domain: window.location.host,
            expDate: '1321312312'
        },
        {
            name: 'darkmode',
            value: 'true',
            path: '/',
            domain: window.location.host
        }
    ]);
});